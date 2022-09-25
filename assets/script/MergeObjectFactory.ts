import { _decorator, Node, instantiate, Component } from 'cc';
import { Block } from './Block';
import { MapData } from './MapData';
import { ObjectFactory } from './ObjectFactory';
const { ccclass, property } = _decorator;

@ccclass('MergeObjectFactory')
export class MergeObjectFactory {
    private mergeLayer: Node = null;
    private map: MapData;
    private mObject: Component[];

    constructor(mergeLayer: Node, map: MapData) {
        this.mergeLayer = mergeLayer;
        this.map = map;
        this.mObject = new Array<Component>();
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
        const currentMobject = this.map.currentObjectData;

        const objs = currentMobject;
        objs.forEach((objData) => {
            let blockData = currentMap[objData[1]];
            if (blockData && blockData[0] !== '') {
                const obj = ObjectFactory.get(objData[0]);
                const x = Math.floor(objData[1] % this.mapSetting.maxRow);
                const z = objData[1] === 0 ? 0 : Math.floor(objData[1] / this.mapSetting.maxCol);
                obj.setPosition(x + this.mapSetting.startRow, 0, z + this.mapSetting.startCol);
                this.mergeLayer.addChild(obj);
                this.mObject.push(obj.getComponent(Component));
            }
        });
    }
}

