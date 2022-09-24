import { _decorator, Component, Prefab, NodePool, Node, instantiate } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ObjectFactory')
export class ObjectFactory extends Component {

    @property({ type: Prefab })
    private prefabs: Prefab[] = [];

    private static _instance: ObjectFactory;
    private pools = new Map<string, NodePool>();

    onLoad() {
        ObjectFactory._instance = this;
    }

    start() {
        this.initSetAll();
    }

    private initSetAll() {
        this.prefabs.forEach((prefab) => {
            ObjectFactory.set(prefab.data.name);
        });
    }

    static get instance(): ObjectFactory {
        return ObjectFactory._instance;
    }

    static set(poolName: string) {
        ObjectFactory.instance.pools.set(poolName, new NodePool(poolName));
    }

    static get(poolName: string, ...args: any): Node {
        const pool = ObjectFactory.instance.pools.get(poolName);
        if (pool && pool.size() > 0) {
            return pool.get(args);
        } else {
            const prefab = ObjectFactory.instance.prefabs.find((prefab) => prefab.data.name === poolName);
            if (prefab) {
                return instantiate(prefab);
            } else {
                return null;
            }
        }
    }
}

