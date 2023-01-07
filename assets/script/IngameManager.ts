import { _decorator, Component, Node, Camera } from 'cc';
import { Block } from './Block';
import { BlockFactory } from './BlockFactory';
import { IngameUiLayer } from './IngameUiLayer';
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

    @property({ type: IngameUiLayer })
    private uiLayer: IngameUiLayer = null;

    private static _instance: IngameManager;


    private blockFactory: BlockFactory;
    private mergeObjectFactory: MergeObjectFactory;
    private map: MapData;

    onLoad() {
        IngameManager._instance = this;
    }

    start() {
        this.map = new MapData();
        this.map.getMapFromID('2');
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

    public static get currentBlocks(): Block[] {
        return IngameManager._instance.blockFactory.currentBlocks;
    }

    public static get uiLayer(): IngameUiLayer {
        return IngameManager._instance.uiLayer;
    }
}

