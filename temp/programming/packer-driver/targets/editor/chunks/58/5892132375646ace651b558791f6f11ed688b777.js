System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, mapData, _dec, _class, _crd, ccclass, property, MapData;

  function _reportPossibleCrUseOfmapData(extras) {
    _reporterNs.report("mapData", "../data/map.json", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
    }, function (_unresolved_2) {
      mapData = _unresolved_2.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "240c2ZT01tDDY4Aa9pIGXFD", "MapData", undefined);

      __checkObsolete__(['_decorator']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("MapData", MapData = (_dec = ccclass('MapData'), _dec(_class = class MapData {
        // startRow = centerPivotX - (maxRow / 2);
        constructor() {
          this._setting = {
            maxRow: 0,
            maxCol: 0,
            startRow: 0,
            startCol: 0,
            centerPivotX: 0,
            centerPivotY: 0
          };
          this._currentMap = {
            id: '',
            row: 0,
            col: 0,
            map: null
          };
          this._setting = (_crd && mapData === void 0 ? (_reportPossibleCrUseOfmapData({
            error: Error()
          }), mapData) : mapData).setting;
        }

        get currentMapData() {
          return this._currentMap.map;
        }

        get setting() {
          return this._setting;
        }

        getMapFromID(id) {
          this._currentMap = (_crd && mapData === void 0 ? (_reportPossibleCrUseOfmapData({
            error: Error()
          }), mapData) : mapData)[id];
          return this._currentMap;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5892132375646ace651b558791f6f11ed688b777.js.map