import { _decorator, Node, Component, utils, Vec3 } from 'cc';
import evolutionData from '../data/evolution.json';
import { MapData } from './MapData';
import { ObjectFactory } from './ObjectFactory';
import { Utils } from './Utils';
const { ccclass, property } = _decorator;

export enum zIndex {
    OBJECT,
    DRAG,
}

@ccclass('Mergeable')
export class Mergeable extends Component {
    public isClustered = false;
    public mergeObjectFactory: MergeObjectFactory;

    setMergeObjectFactory(mergeObjFactory: MergeObjectFactory): void {
        this.mergeObjectFactory = mergeObjFactory;
    };

    put() {
        this.isClustered = false;
    }
}

@ccclass('MergeObjectFactory')
export class MergeObjectFactory {
    private mergeLayer: Node = null;
    private map: MapData;
    private mObject: Component[];
    private mPrefabEvolution: Map<string, string>;
    private mCurrentCluster: Array<Mergeable>;

    constructor(mergeLayer: Node, map: MapData) {
        this.mergeLayer = mergeLayer;
        this.map = map;
        this.mObject = new Array<Component>();
        this.mCurrentCluster = new Array<Mergeable>();
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

        for (let i = currentMobject.length; i--;) {
            const objData = currentMobject[i];
            let blockData = currentMap[objData[1]];
            if (blockData && blockData[0] !== '') {
                const obj = ObjectFactory.get(objData[0]);
                const position = this.getPositionXY(objData[1]);
                const objComponent = obj.getComponent(Mergeable);
                obj.setPosition(position.x + this.mapSetting.startRow, position.y + this.mapSetting.startCol, zIndex.OBJECT);
                this.mergeLayer.addChild(obj);
                if (objComponent) {
                    this.mObject.push(objComponent);
                    objComponent.setMergeObjectFactory && objComponent.setMergeObjectFactory(this);
                }
            }
        }
    }

    deleteMObjectPool(obj: Component) {
        this.mObject.splice(this.mObject.indexOf(obj), 1);
    }

    createMergedObject(x: number, y: number, prefabName: string): Mergeable {
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
            return objComponent;
        }
    }

    createRandomObject(): boolean {
        // 생성 역연산 해서 이미 오브젝트가 존재하는 블럭 번호를 가져옴
        let existN = this.mObject.map((mergeable: Mergeable) => this.getPositionNth(mergeable.node.getPosition().x, mergeable.node.getPosition().y));
        const rangeN = Array(this.map.currentMapData.length - 1).fill(0).map((v, i) => i + 1);
        rangeN.push(0); // 위 코드로 0이 안들어가서 강제 삽입

        // 차집합계산으로 오브젝트가 존재하지 않는 블럭을 찾음
        const itemsN = rangeN.filter(x => existN.indexOf(x) === -1);
        const len = itemsN.length;
        itemsN.sort(() => Math.random() - 0.5); // 랜덤으로 섞음
        for (let i = 0; i < len; i++) {
            // 빈 블럭이 아닌 곳의 번호를 가져와서 배치함
            if (!this.isNullBlock(itemsN[i])) {
                const position = this.getPositionXY(itemsN[i]);
                const obj = this.createMergedObject(position.x + this.mapSetting.startRow, position.y + this.mapSetting.startCol, Utils.randomPickInArray(Object.keys(evolutionData)));
                this.mergeCluster(obj);
                return true;
            }
        }

        return false;
    }

    flushCluster(onlyFlush: boolean = false, callback?: Function) {
        if (!onlyFlush) {
            for (let i = this.mCurrentCluster.length; i--;) {
                const object = this.mCurrentCluster[i];
                if (object.isClustered) {
                    console.log("flush: ", object.node.name);
                    this.deleteMObjectPool(object);
                    ObjectFactory.put(object.node.name, object.node);
                }
            }
        } else {
            for (let i = this.mCurrentCluster.length; i--;) {
                const object = this.mCurrentCluster[i];
                if (object.isClustered) {
                    object.isClustered = false;
                }
            }

        }
        this.mCurrentCluster = [];

        callback && callback();
    }

    getCluster(object: Mergeable): Array<Mergeable> {
        console.log(this.mObject.map((o: Mergeable) => o.isClustered === true));
        if (object.isClustered) {
            return;
        }

        object.isClustered = true;
        this.mCurrentCluster.push(object);
        console.log("push: ", object.node.name);
        const position = object.node.getPosition();

        let objectB;
        if (objectB = this.isAlreadyCreated(position.x, position.y - 1)) {
            this.getNearObject(object, objectB);
        }
        if (objectB = this.isAlreadyCreated(position.x - 1, position.y)) {
            this.getNearObject(object, objectB);
        }
        if (objectB = this.isAlreadyCreated(position.x + 1, position.y)) {
            this.getNearObject(object, objectB);
        }
        if (objectB = this.isAlreadyCreated(position.x, position.y + 1)) {
            this.getNearObject(object, objectB);
        }

        return this.mCurrentCluster;
    }

    getNearObject(objectA: Mergeable, objectB: Mergeable) {
        if (objectA.node.name === objectB.node.name) {
            this.getCluster(objectB);
        }
    }

    mergeCluster(object: Mergeable) {
        const currentCluster = this.getCluster(object);
        if (currentCluster && currentCluster.length > 2) {
            const nextObj = this.getNextPrefabEvolution(object.node.name);
            if (nextObj) {
                this.flushCluster(false, () => {
                    const position = object.node.getPosition();
                    this.createMergedObject(position.x, position.y, nextObj);
                });
                return;
            }
        }
        this.flushCluster(true);
    }

    isNullBlock(n?: number, x?: number, y?: number) {
        let blockData = x || y != null ?
            this.map.currentMapData[this.getPositionNth(x, y)] : this.map.currentMapData[n];
        if (blockData && blockData[0] !== '') {
            return false;
        } else {
            return true;
        }
    }

    isAlreadyCreated(x: number, y: number) {
        for (let i = this.mObject.length; i--;) {
            const position = this.mObject[i].node.getPosition();
            if (position.x === x && position.y === y) {
                return this.mObject[i];
            }
        }
        return false;
    }

    private getPositionNth(x: number, y: number): number {
        return x - this.mapSetting.startRow + (y - this.mapSetting.startCol) * this.mapSetting.maxCol;
    }

    private getPositionXY(n: number): Vec3 {
        return new Vec3(Math.floor(n % this.mapSetting.maxRow), n === 0 ? 0 : Math.floor(n / this.mapSetting.maxCol), zIndex.OBJECT);
    }

    getNextPrefabEvolution(key: string) {
        return this.mPrefabEvolution.get(key);
    }
}