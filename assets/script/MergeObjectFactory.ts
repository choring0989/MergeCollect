import { _decorator, Node, Component } from 'cc';
import { Coin } from './Coin';
import { MapData } from './MapData';
import { ObjectFactory } from './ObjectFactory';
const { ccclass, property } = _decorator;

@ccclass('Mergeable')
export class Mergeable extends Component {

    public mergeObjectFactory: MergeObjectFactory;
    
    setMergeObjectFactory(mergeObjFactory: MergeObjectFactory): void {
        this.mergeObjectFactory = mergeObjFactory;
    };
}

@ccclass('MergeObjectFactory')
export class MergeObjectFactory {
    private mergeLayer: Node = null;
    private map: MapData;
    private mObject: Component[];

    constructor(mergeLayer: Node, map: MapData) {
        this.mergeLayer = mergeLayer;
        this.map = map;
        this.mObject = new Array<Component>();;
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
                const y = objData[1] === 0 ? 0 : Math.floor(objData[1] / this.mapSetting.maxCol);
                const objComponent = obj.getComponent(Mergeable);
                obj.setPosition(x + this.mapSetting.startRow, y + this.mapSetting.startCol, 0);
                this.mergeLayer.addChild(obj);
                if (objComponent) {
                    this.mObject.push(objComponent);
                    objComponent.setMergeObjectFactory && objComponent.setMergeObjectFactory(this);
                }
            }
        });
    }

    deleteMObjectPool(obj: Component) {
        this.mObject.splice(this.mObject.indexOf(obj), 1);
    }

    createdMergedObject(x: number, y: number, prefabName: string) {
        if (this.isAlreadyCreated(x, y)) {
            return;
        }

        const obj = ObjectFactory.get(prefabName);
        const objComponent = obj.getComponent(Mergeable);
        obj.setPosition(x, y, 0);
        if (objComponent) {
            this.mObject.push(objComponent);
            objComponent.setMergeObjectFactory && objComponent.setMergeObjectFactory(this);
        }
    }

    private isAlreadyCreated(x: number, y: number) {
        for (let i = 0; i < this.mObject.length; i++) {
            const position = this.mObject[i].node.getPosition();
            if (position.x === x && position.y === y) {
                return true;
            }
        }
        return false;
    }
}