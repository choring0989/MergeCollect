import { _decorator } from 'cc';
import mapData from '../data/map.json';
const { ccclass, property } = _decorator;

@ccclass('MapData')
export class MapData {
    private _setting = new MapSettig();
    private _currentMap = new StageData();

    constructor() {
        this._setting.parse(mapData.setting);
    }

    get currentMapData() {
        return this._currentMap.map;
    }

    get currentObjectData() {
        return this._currentMap.object;
    }

    get setting(): MapSettig {
        return this._setting;
    }

    getMapFromID(id: string) {
        this._currentMap = mapData[id];
        return this._currentMap;
    }
}

export class MapSettig {
    maxRow: number = 0;
    maxCol: number = 0;
    // startRow = centerPivotX - (maxRow / 2);
    startRow: number = 0;
    startCol: number = 0;
    centerPivotX: number = 0;
    centerPivotY: number = 0;

    parse(data) {
        this.maxRow = data.maxRow ?? 0;
        this.maxCol = data.maxCol ?? 0;
        this.centerPivotX = data.centerPivotX ?? 0;
        this.centerPivotY = data.centerPivotY ?? 0;
        this.startRow = this.centerPivotX - (this.maxRow / 2);
        this.startCol = this.centerPivotY - (this.maxCol / 2);
    }
}

export class StageData {
    id: string = '';
    map: Array<any> = null;
    object: Array<any> = null;

    parse(data) {
        this.id = data.id ?? '';
        this.map = data.map ?? null;
        this.object = data.object ?? null;
    }
}

