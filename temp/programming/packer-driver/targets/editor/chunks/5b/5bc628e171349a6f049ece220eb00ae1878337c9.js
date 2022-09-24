System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, MapData, _dec, _class, _crd, ccclass, property, BlockFactory;

  function _reportPossibleCrUseOfBlock(extras) {
    _reporterNs.report("Block", "./Block", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMapData(extras) {
    _reporterNs.report("MapData", "./MapData", _context.meta, extras);
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
      MapData = _unresolved_2.MapData;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d3a24Na5f5JbaB7qdsbcVe5", "BlockFactory", undefined);

      __checkObsolete__(['_decorator', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("BlockFactory", BlockFactory = (_dec = ccclass('BlockFactory'), _dec(_class = class BlockFactory {
        constructor(blockLayer) {
          this.blockLayer = null;
          this.map = void 0;
          this.blocks = void 0;
          this.blockLayer = blockLayer;
          this.start();
        }

        start() {
          this.map = new (_crd && MapData === void 0 ? (_reportPossibleCrUseOfMapData({
            error: Error()
          }), MapData) : MapData)();
          this.createMap();
        }

        createMap() {
          const pivotX = this.map.centerPivotX - this.map.maxLow / 2;
          const pivotY = this.map.centerPivotY - this.map.maxCol / 2;
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=5bc628e171349a6f049ece220eb00ae1878337c9.js.map