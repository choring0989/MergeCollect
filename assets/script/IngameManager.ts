import { _decorator, Component, Node, Camera } from 'cc';
import { BlockFactory } from './BlockFactory';
import { MapData, MapSettig } from './MapData';
import { MergeObjectFactory } from './MergeObjectFactory';
const { ccclass, property } = _decorator;

@ccclass('IngameManager')
export class IngameManager extends Component {

    @property({ type: Camera })
    private readonly camera: Camera;

    @property({ type: Node })
    private blockLayer: Node = null;

    @property({ type: Node })
    private mergeLayer: Node = null;

    @property({ type: Node })
    private uiLayer: Node = null;

    private static _instance: IngameManager;


    private blockFactory: BlockFactory;
    private mergeObjectFactory: MergeObjectFactory;
    private map: MapData;

    onLoad() {
        IngameManager._instance = this;
    }

    start() {
        this.map = new MapData();
        this.map.getMapFromID('1');
        this.blockFactory = new BlockFactory(this.blockLayer, this.map);
        this.mergeObjectFactory = new MergeObjectFactory(this.mergeLayer, this.map);
    }

    update(deltaTime: number) {

    }

    public static get camera(): Camera {
        return IngameManager._instance.camera;
    }

    public static get mapSetting(): MapSettig {
        return IngameManager._instance.blockFactory.mapSetting;
    }
}

