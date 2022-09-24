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

    createMap(id) {
        const pivotX = this.map.centerPivotX - (this.map.maxRow / 2);
        const pivotY = this.map.centerPivotY - (this.map.maxCol / 2);
        const currentMap = this.map.getMapFromID(id);
        let k = 0;

        for (let i = 0; i < currentMap.row; i++) {
            for (let j = 0; j < currentMap.col; j++) {
                let blockData = this.map.getCurrentMapData()[k];
                if (blockData[1] === k) {
                    const block = ObjectFactory.get(blockData[0]);
                    block.setPosition(pivotX + i, 0, pivotY + j);
                    this.blockLayer.addChild(block);
                    this.blocks.push(block.getComponent(Block));
                }
                k++;
            }
        }
    }
}

