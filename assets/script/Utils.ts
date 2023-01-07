import { _decorator, EventTouch, geometry, Node, PhysicsSystem, Label, math, Button, Canvas, } from 'cc';
import { IngameManager } from './IngameManager';
import { ObjectFactory } from './ObjectFactory';

export class Utils {
    private _ray: geometry.Ray = new geometry.Ray();
    private static _instance: Utils = new Utils();

    constructor() {

    }

    public static raycast(event: EventTouch, node: Node, hit: Function, miss?: Function) {
        const touch = event.touch!;
        IngameManager.camera.screenPointToRay(touch.getLocationX(), touch.getLocationY(), this._instance._ray);
        if (PhysicsSystem.instance.raycast(this._instance._ray)) {
            const raycastResults = PhysicsSystem.instance.raycastResults;
            for (let i = 0; i < raycastResults.length; i++) {
                const item = raycastResults[i];
                if (item.collider.node == node) {
                    hit(item);
                    break;
                }
            }
        } else {
            miss && miss();
        }
    }

    public static addDebugLabel(x: number, y: number, layer: Node) {
        const canvas = layer.getComponentInChildren(Canvas);
        const node = ObjectFactory.get('DebugButton');
        const btn = node.getComponent(Button);
        const label = btn.getComponentInChildren(Label);
        node.setPosition(x * 80, y * 80, 2);
        canvas.node.addChild(node);
        label.fontSize -= 5;
        label.string = "(" + x + ", " + y + ")";
        label.color = math.Color.RED;
    }
}

