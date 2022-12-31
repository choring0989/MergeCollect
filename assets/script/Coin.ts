import { _decorator, Component, EventTouch, BoxCollider, input, Input, physics, tween, Vec3, ITriggerEvent, Node } from 'cc';
import { IngameManager } from './IngameManager';
import { Mergeable } from './MergeObjectFactory';
import { ObjectFactory } from './ObjectFactory';
import { Utils } from './Utils';
const { ccclass, property } = _decorator;

@ccclass('Coin')
export class Coin extends Mergeable {

    onEnable() {
        input.on(Input.EventType.TOUCH_MOVE, this.onMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);

        let collider = this.node.getComponent(BoxCollider)!;
        collider.on('onTriggerEnter', this.onTrigger, this);
    }

    onDisable() {
        input.off(Input.EventType.TOUCH_MOVE, this.onMove, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    update(deltaTime: number) {
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
        }
    }

    private setTilePosition(item: physics.PhysicsRayResult) {
        let x = Math.min(Math.round(item.hitPoint.x), IngameManager.mapSetting.maxRow / 2 - 1);
        let y = Math.min(Math.round(item.hitPoint.y), IngameManager.mapSetting.maxCol / 2 - 1);
        x = x < IngameManager.mapSetting.startRow ? IngameManager.mapSetting.startRow : x;
        y = y < IngameManager.mapSetting.startCol ? IngameManager.mapSetting.startCol : y;

        tween().target(this.node)
            .to(0.25, { position: new Vec3(x, y, 0), easing: 'quadIn' })
            .start();
    }

    // 콜라이더가 붙어있는 두 오브젝트를 모두 풀로 돌려보낸다
    private merge(other: Node, me: Node) {
        ObjectFactory.put(other.name, other);
        if (this.mergeObjectFactory) {
            this.mergeObjectFactory.deleteMObjectPool(this);
        }
    }
}