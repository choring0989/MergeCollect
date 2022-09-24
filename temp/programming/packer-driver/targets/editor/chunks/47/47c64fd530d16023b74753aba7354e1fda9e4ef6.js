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
        constructor() {
          this.maxLow = 0;
          this.maxCol = 0;
          this.map = {
            id: '',
            low: 0,
            col: 0,
            map: []
          };
        }

        getMapFromID(id) {
          this.map = (_crd && mapData === void 0 ? (_reportPossibleCrUseOfmapData({
            error: Error()
          }), mapData) : mapData)[id];
          return this.map;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=47c64fd530d16023b74753aba7354e1fda9e4ef6.js.map