System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Block, MapData, ObjectFactory, _dec, _class, _crd, ccclass, property, BlockFactory;

  function _reportPossibleCrUseOfBlock(extras) {
    _reporterNs.report("Block", "./Block", _context.meta, extras);
  }

  function _reportPossibleCrUseOfMapData(extras) {
    _reporterNs.report("MapData", "./MapData", _context.meta, extras);
  }

  function _reportPossibleCrUseOfObjectFactory(extras) {
    _reporterNs.report("ObjectFactory", "./ObjectFactory", _context.meta, extras);
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
      Block = _unresolved_2.Block;
    }, function (_unresolved_3) {
      MapData = _unresolved_3.MapData;
    }, function (_unresolved_4) {
      ObjectFactory = _unresolved_4.ObjectFactory;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "d3a24Na5f5JbaB7qdsbcVe5", "BlockFactory", undefined);

      __checkObsolete__(['_decorator', 'Node', 'instantiate']);

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
          this.blocks = new Array();
          this.start();
        }

        start() {
          this.map = new (_crd && MapData === void 0 ? (_reportPossibleCrUseOfMapData({
            error: Error()
          }), MapData) : MapData)();
          this.createMap('1');
        }

        get mapSetting() {
          return this.map.setting;
        }

        createMap(id) {
          var currentMap = this.map.getMapFromID(id);
          var k = 0;

          for (var i = 0; i < currentMap.row; i++) {
            for (var j = 0; j < currentMap.col; j++) {
              var blockData = this.map.currentMapData[k];

              if (blockData[1] === k) {
                var block = (_crd && ObjectFactory === void 0 ? (_reportPossibleCrUseOfObjectFactory({
                  error: Error()
                }), ObjectFactory) : ObjectFactory).get(blockData[0]);
                block.setPosition(this.mapSetting.startRow + i, 0, this.mapSetting.startCol + j);
                this.blockLayer.addChild(block);
                this.blocks.push(block.getComponent(_crd && Block === void 0 ? (_reportPossibleCrUseOfBlock({
                  error: Error()
                }), Block) : Block));
              }

              k++;
            }
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=69ecf33b4bbc9d1cb35f12a147d4b8739b5fd64b.js.map