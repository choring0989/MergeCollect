import { _decorator } from 'cc';
import mapData from '../data/map.json';
const { ccclass, property } = _decorator;

@ccclass('MapData')
export class MapData {
    // startRow = centerPivotX - (maxRow / 2);
    private _setting = {
        maxRow: 0,
        maxCol: 0,
        startRow: 0,
        startCol: 0,
        centerPivotX: 0,
        centerPivotY: 0,
    }

    private _currentMap = {
        id: '',
        row: 0,
        col: 0,
        map: null,
    };

    constructor() {
        this._setting = mapData.setting;
    }

    get currentMapData() {
        return this._currentMap.map;
    }

    get setting() {
        return this._setting;
    }

    getMapFromID(id: string) {
        this._currentMap = mapData[id];
        return this._currentMap;
    }
}

