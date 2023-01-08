import { _decorator, Component, Label } from 'cc';
import { MergeObjectFactory } from './MergeObjectFactory';
const { ccclass, property } = _decorator;

@ccclass('IngameUiLayer')
export class IngameUiLayer extends Component {
    @property({ type: Label })
    private lifeCount: Label = null;

    @property({ type: Label })
    private coinCount: Label = null;

    private mergeObjectFactory: MergeObjectFactory;

    onLoad() {
        this.initText();
    }

    private initText() {
        this.lifeCount.string = '0';
        this.coinCount.string = '0';
    }

    public setMergeObjectFactory(mergeObjectFactory) {
        this.mergeObjectFactory = mergeObjectFactory;
    }

    public onClickRandomBox() {
        this.mergeObjectFactory.createRandomObject();
    }
}