import { _decorator, Node, instantiate } from 'cc';
import { Block } from './Block';
import { MapData, StageData } from './MapData';
import { ObjectFactory } from './ObjectFactory';
const { ccclass, property } = _decorator;

@ccclass('BlockFactory')
export class BlockFactory {
    private blockLayer: Node = null;
    private map: MapData;
    private blocks: Block[];

    constructor(blockLayer: Node, map: MapData) {
        this.blockLayer = blockLayer;
        this.map = map;
        this.blocks = new Array<Block>();
        this.start();
    }

    start() {
        this.createMap();
    }

    get mapSetting() {
        return this.map.setting;
    }

    createMap() {
        const currentMap = this.map.currentMapData;
        let k = 0;

        for (let i = 0; i < this.mapSetting.maxRow; i++) {
            for (let j = 0; j < this.mapSetting.maxCol; j++) {
                let blockData = currentMap[k];
                if (blockData && blockData[0] !== '' && blockData[1] === k) {
                    const block = ObjectFactory.get(blockData[0]);
                    block.setPosition(this.mapSetting.startRow + i, this.mapSetting.startCol + j, -1);
                    this.blockLayer.addChild(block);
                    this.blocks.push(block.getComponent(Block));
                }
                k++;
            }
        }
    }
}

