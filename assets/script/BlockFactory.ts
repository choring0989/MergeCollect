import { _decorator, Node, Scene } from 'cc';
import { Block } from './Block';
import { IngameManager } from './IngameManager';
import { MapData } from './MapData';
import { ObjectFactory } from './ObjectFactory';
import { Utils } from './Utils';
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
        currentMap.forEach((objData) => {
            let blockData = currentMap[objData[1]];
            if (blockData && blockData[0] !== '') {
                const block = ObjectFactory.get(blockData[0]);
                const x = Math.floor(blockData[1] % this.mapSetting.maxRow);
                const y = blockData[1] === 0 ? 0 : Math.floor(blockData[1] / this.mapSetting.maxCol);
                block.setPosition(this.mapSetting.startRow + x, this.mapSetting.startCol + y, -1);
                this.blockLayer.addChild(block);
                this.blocks.push(block.getComponent(Block));

                Utils.addDebugLabel(block.getPosition().x, block.getPosition().y, IngameManager.uiLayer.node);
            }
        });
    }
}

