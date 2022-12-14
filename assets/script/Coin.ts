import { _decorator, Component, EventTouch, BoxCollider, input, Input, physics, tween, Vec3, ITriggerEvent, Node } from 'cc';
import { Block } from './Block';
import { IngameManager } from './IngameManager';
import { Mergeable } from './MergeObjectFactory';
import { ObjectFactory } from './ObjectFactory';
import { Utils } from './Utils';
const { ccclass, property } = _decorator;

@ccclass('Coin')
export class Coin extends Mergeable {
    private prePosition: Vec3;

    onEnable() {
        input.on(Input.EventType.TOUCH_START, this.setPrePosition, this);
        input.on(Input.EventType.TOUCH_MOVE, this.onMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);

        let collider = this.node.getComponent(BoxCollider)!;
        collider.on('onTriggerEnter', this.onTrigger, this);
        this.setPrePosition();
    }

    onDisable() {
        input.off(Input.EventType.TOUCH_START, this.setPrePosition, this);
        input.off(Input.EventType.TOUCH_MOVE, this.onMove, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    update(deltaTime: number) {
    }

    private setPrePosition() {
        this.prePosition = this.node.getPosition();
    }

    private onMove(event: EventTouch) {
        this.preventOutOfBoard(event) ? null : Utils.raycast(event, this.node, this.drag.bind(this));
    }

    private preventOutOfBoard(event: EventTouch): boolean {
        const pos = IngameManager.camera.screenToWorld(new Vec3(event.touch.getLocationX(), event.touch.getLocationY(), 0));
        if (pos.x > IngameManager.mapSetting.maxRow / 2 || pos.y > IngameManager.mapSetting.maxCol / 2) {
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
    }

    private drag(item: physics.PhysicsRayResult) {
        this.node.setPosition(item.hitPoint.x, item.hitPoint.y, 0);
    }

    private onTrigger(event: ITriggerEvent) {
        let other: physics.Collider = event.otherCollider;
        let me: physics.Collider = event.selfCollider;

        if (other.node.name === me.node.name) {
            this.merge(other.node, me.node);
        } else {
            tween().target(this.node)
                .to(0.25, { position: new Vec3(this.prePosition.x, this.prePosition.y, 0), easing: 'quadIn' })
                .start();
        }
    }

    private setTilePosition(item: physics.PhysicsRayResult, goTween: boolean = true): Vec3 {
        let x = Math.min(Math.round(item.hitPoint.x), IngameManager.mapSetting.endRow);
        let y = Math.min(Math.round(item.hitPoint.y), IngameManager.mapSetting.endCol);
        x = x < IngameManager.mapSetting.startRow ? IngameManager.mapSetting.startRow : x;
        y = y < IngameManager.mapSetting.startCol ? IngameManager.mapSetting.startCol : y;

        const isEsixtBlock = IngameManager.currentBlocks.filter((value: Block) =>
            value.node.getPosition().x === x && value.node.getPosition().y === y
        );
        if (isEsixtBlock.length === 0) {
            x = this.prePosition.x;
            y = this.prePosition.y;
        }

        if (goTween) {
            tween().target(this.node)
                .to(0.25, { position: new Vec3(x, y, 0), easing: 'quadIn' })
                .start();
        } else {
            this.node.setPosition(x, y, 0);
        }

        return new Vec3(x, y, 0);
    }

    // ??????????????? ???????????? ??? ??????????????? ?????? ?????? ???????????????, json ?????? ????????? ????????? ?????? ???????????? ??????
    private merge(other: Node, me: Node) {
        if (this.mergeObjectFactory) {
            this.mergeObjectFactory.deleteMObjectPool(this);
            const nextObj = this.mergeObjectFactory.getNextPrefabEvolution(me.name);
            if (nextObj) {
                const dummyRay = new physics.PhysicsRayResult();
                dummyRay._assign(new Vec3(me.position.x, me.position.y, 0), null, null, new Vec3(me.position.x, me.position.y, 0));
                const newPosition = this.setTilePosition(dummyRay, false);
                this.mergeObjectFactory.createMergedObject(newPosition.x, newPosition.y, nextObj);
            }
        }
        ObjectFactory.put(other.name, other);
    }
}