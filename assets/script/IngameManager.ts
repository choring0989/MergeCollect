import { _decorator, Component, Node, Camera } from 'cc';
import { BlockFactory } from './BlockFactory';
import { MapData } from './MapData';
const { ccclass, property } = _decorator;

@ccclass('IngameManager')
export class IngameManager extends Component {

    @property({ type: Camera })
    private readonly camera: Camera;

    @property({ type: Node })
    private blockLayer: Node = null;

    @property({ type: Node })
    private objectLayer: Node = null;

    @property({ type: Node })
    private uiLayer: Node = null;

    private static _instance: IngameManager;

    blockFactory: BlockFactory;

    private _mapSetting: MapData["_setting"];

    onLoad() {
        IngameManager._instance = this;
    }

    start() {
        this.blockFactory = new BlockFactory(this.blockLayer);
    }

    update(deltaTime: number) {

    }

    public static get camera() {
        return IngameManager._instance.camera;
    }

    public static get mapSetting() {
        return IngameManager._instance.blockFactory.mapSetting;
    }
}

