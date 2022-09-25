import { _decorator, Node, instantiate } from 'cc';
import { Block } from './Block';
import { MapData } from './MapData';
import { ObjectFactory } from './ObjectFactory';
const { ccclass, property } = _decorator;

@ccclass('BlockFactory')
export class BlockFactory {
    private blockLayer: Node = null;
    private map: MapData;
    private blocks: Block[];

    constructor(blockLayer: Node) {
        this.blockLayer = blockLayer;
        this.blocks = new Array<Block>();
        this.start();
    }

    start() {
        this.map = new MapData();
        this.createMap('1');
    }

    get mapSetting() {
        return this.map.setting;
    }

    createMap(id) {
        const currentMap = this.map.getMapFromID(id);
        let k = 0;

        for (let i = 0; i < currentMap.row; i++) {
            for (let j = 0; j < currentMap.col; j++) {
                let blockData = this.map.currentMapData[k];
                if (blockData[1] === k) {
                    const block = ObjectFactory.get(blockData[0]);
                    block.setPosition(this.mapSetting.startRow + i, 0, this.mapSetting.startCol + j);
                    this.blockLayer.addChild(block);
                    this.blocks.push(block.getComponent(Block));
                }
                k++;
            }
        }
    }
}

