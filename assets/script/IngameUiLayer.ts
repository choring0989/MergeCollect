import { _decorator, Component, Label, Node, Widget, Button } from 'cc';
import { MapData, StageData } from './MapData';
import { MergeObjectFactory } from './MergeObjectFactory';
import { ObjectFactory } from './ObjectFactory';
const { ccclass, property } = _decorator;

@ccclass('IngameUiLayer')
export class IngameUiLayer extends Component {
    private lifeCount: Label = null;
    private coinCount: Label = null;
    private missionLabel: Label = null;
    private randomBoxBtn: Button = null;

    private ingameUI: Node = null;
    private mergeObjectFactory: MergeObjectFactory;
    private currentStageData: StageData;

    init() {
        this.ingameUI = ObjectFactory.get('IngameUI');
        this.node.addChild(this.ingameUI);
        this.ingameUI.getComponent(Widget).target = this.node.parent;
        this.initText();
        this.initButton();
    }

    onLoad() {
    }

    private initText() {
        this.lifeCount = this.ingameUI.getComponentsInChildren(Label).filter((label) => label.node.name === 'life_number')[0];
        this.coinCount = this.ingameUI.getComponentsInChildren(Label).filter((label) => label.node.name === 'coin_number')[0];
        this.missionLabel = this.ingameUI.getComponentsInChildren(Label).filter((label) => label.node.name === 'mission_label')[0];
        this.lifeCount.string = '0';
        this.coinCount.string = '0';
    }

    private initButton() {
        this.randomBoxBtn = this.ingameUI.getComponentsInChildren(Button).filter((label) => label.node.name === 'random_btn')[0];
        this.randomBoxBtn.node.on(Button.EventType.CLICK, this.onClickRandomBox, this);
    }

    public setMergeObjectFactory(mergeObjectFactory) {
        this.mergeObjectFactory = mergeObjectFactory;
    }

    public setCurrentStageData(data: StageData) {
        this.currentStageData = data;
        this.missionLabel.string = this.currentStageData.mission;
    }

    public onClickRandomBox(event) {
        this.mergeObjectFactory.createRandomObject();
    }
}