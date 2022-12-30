import { _decorator, Component, Label } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('IngameUiLayer')
export class IngameUiLayer extends Component {
    @property({ type: Label })
    private lifeCount: Label = null;

    @property({ type: Label })
    private coinCount: Label = null;

    onLoad() {
        this.initText();        
    }

    private initText() {
        this.lifeCount.string = '0';
        this.coinCount.string = '0';
    }
}