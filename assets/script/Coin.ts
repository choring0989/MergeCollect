import { _decorator, Component, EventTouch, geometry, input, Input, PhysicsSystem, physics, tween, Vec3 } from 'cc';
import { IngameManager } from './IngameManager';
import { Utils } from './Utils';
const { ccclass, property } = _decorator;

@ccclass('Coin')
export class Coin extends Component {

    onEnable() {
        input.on(Input.EventType.TOUCH_MOVE, this.onMove, this);
        input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    onDisable() {
        input.off(Input.EventType.TOUCH_MOVE, this.onMove, this);
        input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
    }

    private onMove(event: EventTouch) {
        Utils.raycast(event, this.node, this.drag.bind(this));
    }

    private onTouchEnd(event: EventTouch) {
        Utils.raycast(event, this.node, this.setTilePosition.bind(this));
    }

    private drag(item: physics.PhysicsRayResult) {
        this.node.setPosition(item.hitPoint.x, item.hitPoint.y, 0);
    }

    // @TODO: 마우스 커서가 화면 밖으로 나갈대 처리
    private setTilePosition(item: physics.PhysicsRayResult) {
        let x = Math.min(Math.round(item.hitPoint.x), IngameManager.mapSetting.maxRow / 2 - 1);
        let y = Math.min(Math.round(item.hitPoint.y), IngameManager.mapSetting.maxCol / 2 - 1);
        x = x < IngameManager.mapSetting.startRow ? IngameManager.mapSetting.startRow : x;
        y = y < IngameManager.mapSetting.startCol ? IngameManager.mapSetting.startCol : y;

        tween().target(this.node)
            .to(0.25, { position: new Vec3(x, y, 0), easing: 'quadIn' })
            .start();
    }
}

