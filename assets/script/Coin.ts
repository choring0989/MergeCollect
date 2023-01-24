import { _decorator, Component, EventTouch, BoxCollider, input, Input, physics, tween, Vec3, ITriggerEvent, Node } from 'cc';
import { Block } from './Block';
import { IngameManager } from './IngameManager';
import { Mergeable, zIndex } from './MergeObjectFactory';
import { ObjectFactory } from './ObjectFactory';
import { Utils } from './Utils';
const { ccclass, property } = _decorator;

@ccclass('Coin')
export class Coin extends Mergeable {
    private prePosition: Vec3;
    private collider: BoxCollider;

    onEnable() {
        input.on(Input.EventType.TOUCH_START, this.onTouchStart, this);
        this.collider = this.node.getComponent(BoxCollider);
        this.setPrePosition();
    }

    onDisable() {
        input.off(Input.EventType.TOUCH_START, this.onTouchStart, this);
    }

    update(deltaTime: number) {
    }

    private onTouchStart(event: EventTouch) {
        Utils.raycast(event, this.node, () => {
            this.onTouchStartEvents();
            this.setPrePosition();
        });
    }

    private setPrePosition() {
        this.prePosition = this.node.getPosition();
    }

    private onMove(event: EventTouch) {
        this.preventOutOfBoard(event) ? null : Utils.raycast(event, this.node, this.drag.bind(this));
    }

    private drag(item: physics.PhysicsRayResult) {
        this.node.setPosition(item.hitPoint.x, item.hitPoint.y, zIndex.DRAG);
    }

    private onTrigger(event: ITriggerEvent) {
        const x = this.prePosition.x;
        const y = this.prePosition.y;
        this.setTilePosition(null, x, y, true);
        this.offTouthEndEvents();
    }

    private preventOutOfBoard(event: EventTouch): boolean {
        const pos = IngameManager.camera.screenToWorld(new Vec3(event.touch.getLocationX(), event.touch.getLocationY(), zIndex.OBJECT));
        if (pos.x > IngameManager.mapSetting.maxRow * 0.5 || pos.y > IngameManager.mapSetting.maxCol * 0.5) {
            this.onTouchEnd(event);
            return true;
        }
        else if (pos.x + 1 < IngameManager.mapSetting.startRow || pos.y + 1 < IngameManager.mapSetting.startRow) {
            this.onTouchEnd(event);
            return true;
        }
        return false;
    }

    private onTouchEnd(event: EventTouch) {
        Utils.raycast(event, this.node, this.setTilePosition.bind(this));
        this.offTouthEndEvents();
    }

    private onTouchStartEvents() {
        this.collider?.on('onTriggerEnter', this.onTrigger, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    private offTouthEndEvents() {
        this.collider?.off('onTriggerEnter', this.onTrigger, this);
        input.off(Input.EventType.TOUCH_MOVE, this.onMove, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    private setTilePosition(item?: physics.PhysicsRayResult, x?: number, y?: number, goTween: boolean = true): Vec3 {
        x = x != null ? x : item.hitPoint.x;
        y = y != null ? y : item.hitPoint.y;
        x = Math.min(Math.round(x), IngameManager.mapSetting.endRow);
        y = Math.min(Math.round(y), IngameManager.mapSetting.endCol);
        x = x < IngameManager.mapSetting.startRow ? IngameManager.mapSetting.startRow : x;
        y = y < IngameManager.mapSetting.startCol ? IngameManager.mapSetting.startCol : y;

        // 블록이 없거나 이미 오브젝트가 있는 블록이라면 
        if (this.mergeObjectFactory.isNullBlock(null, x, y) || this.mergeObjectFactory.isAlreadyCreated(x, y)) {
            x = this.prePosition.x;
            y = this.prePosition.y;
        }

        if (goTween) {
            tween().target(this.node)
                .to(0.25, { position: new Vec3(x, y, zIndex.OBJECT), easing: 'quadIn' })
                .call(() => { this.merge() })
                .start();
        }

        return new Vec3(x, y, zIndex.OBJECT);
    }

    private merge() {
        this.mergeObjectFactory.mergeCluster(this);
    }
}