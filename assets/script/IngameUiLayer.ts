import { _decorator, Component, Label } from 'cc';
import { MapData, StageData } from './MapData';
import { MergeObjectFactory } from './MergeObjectFactory';
const { ccclass, property } = _decorator;

@ccclass('IngameUiLayer')
export class IngameUiLayer extends Component {
    @property({ type: Label })
    private lifeCount: Label = null;

    @property({ type: Label })
    private coinCount: Label = null;

    @property({ type: Label })
    private missionLabel: Label = null;
    
    private mergeObjectFactory: MergeObjectFactory;
    private currentStageData: StageData;

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

    public setCurrentStageData(data:StageData) {
        this.currentStageData = data;
        this.missionLabel.string = this.currentStageData.mission;
    }

    public onClickRandomBox() {
        this.mergeObjectFactory.createRandomObject();
    }
}