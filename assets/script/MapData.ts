import { _decorator } from 'cc';
import mapData from '../data/map.json';
const { ccclass, property } = _decorator;

@ccclass('MapData')
export class MapData {

    maxRow: number = 0;
    maxCol: number = 0;
    centerPivotX: number = 0;
    centerPivotY: number = 0;

    currentMap = {
        id: '',
        row: 0,
        col: 0,
        map: null,
    };

    constructor() {
        this.maxRow = mapData.setting.maxRow;
        this.maxCol = mapData.setting.maxCol;
        this.centerPivotX = mapData.setting.centerPivotX;
        this.centerPivotY = mapData.setting.centerPivotY;
    }

    getMapFromID(id: string) {
        this.currentMap = mapData[id];
        return this.currentMap;
    }

    getCurrentMapData() {
        return this.currentMap.map;
    }
}

