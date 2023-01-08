import { _decorator, Node, Component, utils } from 'cc';
import evolutionData from '../data/evolution.json';
import { MapData } from './MapData';
import { ObjectFactory } from './ObjectFactory';
import { Utils } from './Utils';
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
    private mPrefabEvolution: Map<string, string>;

    constructor(mergeLayer: Node, map: MapData) {
        this.mergeLayer = mergeLayer;
        this.map = map;
        this.mObject = new Array<Component>();
        this.setPrefabEvolutionMap();
        this.start();
    }

    private setPrefabEvolutionMap() {
        this.mPrefabEvolution = new Map<string, string>();
        for (let key in evolutionData) {
            const value = evolutionData[key];
            this.mPrefabEvolution.set(key, value);
        }
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

    createMergedObject(x: number, y: number, prefabName: string) {
        if (this.isAlreadyCreated(x, y)) {
            return;
        }

        const obj = ObjectFactory.get(prefabName);
        if (!obj) {
            console.warn("warn :: ", prefabName, " is not exist");
            return;
        }

        const objComponent = obj.getComponent(Mergeable);
        if (objComponent) {
            obj.setPosition(x, y, 0);
            this.mergeLayer.addChild(obj);
            this.mObject.push(objComponent);
            objComponent.setMergeObjectFactory && objComponent.setMergeObjectFactory(this);
        }
    }

    createRandomObject(remain?:Array<number>) {
        // 생성 역연산
        let existN = this.mObject.map((mergeable: Mergeable) =>
            mergeable.node.getPosition().x - this.mapSetting.startRow
            + (mergeable.node.getPosition().y - this.mapSetting.startCol) * this.mapSetting.maxCol);
        if (remain) {
            existN = existN.concat(remain);
        }
        const rangeN = Array(this.map.currentMapData.length - 1).fill(0).map((v, i) => i + 1);
        const itemsN = rangeN.filter(x => existN.indexOf(x) === -1);
        if (itemsN.length === 0) {
            console.log('warn :: There are no blocks on which objects can be placed.');
            return;
        }
        const pickN = Utils.randomPickInArray(itemsN);

        let blockData = this.map.currentMapData[pickN];
        if (blockData && blockData[0] !== '') {
            const x = Math.floor(pickN % this.mapSetting.maxRow);
            const y = pickN === 0 ? 0 : Math.floor(pickN / this.mapSetting.maxCol);
            this.createMergedObject(x + this.mapSetting.startRow, y + this.mapSetting.startCol, Utils.randomPickInArray(Object.keys(evolutionData)));
        } else {
            this.createRandomObject([pickN]);
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

    getNextPrefabEvolution(key: string) {
        return this.mPrefabEvolution.get(key);
    }
}