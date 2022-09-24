import { _decorator, Component, Node, EventTouch, geometry, Camera, input, Input, PhysicsSystem, Vec3 } from 'cc';
import { IngameManager } from './IngameManager';
const { ccclass, property } = _decorator;

@ccclass('Coin')
export class Coin extends Component {
    private _ray: geometry.Ray = new geometry.Ray();

    onEnable() {
        input.on(Input.EventType.TOUCH_MOVE, this.onMove, this);
    }

    onDisable() {
        input.off(Input.EventType.TOUCH_MOVE, this.onMove, this);
    }

    private onMove(event: EventTouch) {
        const touch = event.touch!;
        IngameManager.camera.screenPointToRay(touch.getLocationX(), touch.getLocationY(), this._ray);
        if (PhysicsSystem.instance.raycast(this._ray)) {
            const raycastResults = PhysicsSystem.instance.raycastResults;
            for (let i = 0; i < raycastResults.length; i++) {
                const item = raycastResults[i];
                if (item.collider.node == this.node) {
                    this.drag(item.hitPoint);
                    break;
                }
            }
        } else {
            console.log('raycast does not hit the target node !');
        }
    }

    private drag(hitPoint: Vec3) {
        this.node.setPosition(hitPoint.x, 0, hitPoint.z);
    }
}

