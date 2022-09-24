import { _decorator, Component, Node } from 'cc';
import { BlockFactory } from './BlockFactory';
const { ccclass, property } = _decorator;

@ccclass('IngameManager')
export class IngameManager extends Component {

    @property({ type: Node })
    private blockLayer: Node = null;

    @property({ type: Node })
    private objectLayer: Node = null;

    @property({ type: Node })
    private uiLayer: Node = null;

    blockFactory: BlockFactory;

    start() {
        this.blockFactory = new BlockFactory(this.blockLayer);
    }

    update(deltaTime: number) {
        
    }
}

