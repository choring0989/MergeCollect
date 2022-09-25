System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, Camera, BlockFactory, _dec, _dec2, _dec3, _dec4, _dec5, _class, _class2, _init, _descriptor, _descriptor2, _descriptor3, _class3, _crd, ccclass, property, IngameManager;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _reportPossibleCrUseOfBlockFactory(extras) {
    _reporterNs.report("BlockFactory", "./BlockFactory", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      Camera = _cc.Camera;
    }, function (_unresolved_2) {
      BlockFactory = _unresolved_2.BlockFactory;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "82061lbdaBK1Z3umSIXE50F", "IngameManager", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'Camera']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("IngameManager", IngameManager = (_dec = ccclass('IngameManager'), _dec2 = property(Camera), _dec3 = property({
        type: Node
      }), _dec4 = property({
        type: Node
      }), _dec5 = property({
        type: Node
      }), _dec(_class = (_class2 = (_class3 = class IngameManager extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "blockLayer", _descriptor, this);

          _initializerDefineProperty(this, "objectLayer", _descriptor2, this);

          _initializerDefineProperty(this, "uiLayer", _descriptor3, this);

          this.blockFactory = void 0;
        }

        start() {
          this.blockFactory = new (_crd && BlockFactory === void 0 ? (_reportPossibleCrUseOfBlockFactory({
            error: Error()
          }), BlockFactory) : BlockFactory)(this.blockLayer);
        }

        update(deltaTime) {}

      }, _class3.camera = void 0, _class3), (_applyDecoratedDescriptor(_class2, "camera", [_dec2], (_init = Object.getOwnPropertyDescriptor(_class2, "camera"), _init = _init ? _init.value : undefined, {
        enumerable: true,
        configurable: true,
        writable: true,
        initializer: function () {
          return _init;
        }
      }), _class2), _descriptor = _applyDecoratedDescriptor(_class2.prototype, "blockLayer", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "objectLayer", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "uiLayer", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function () {
          return null;
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a237f96ca1f74ad4349d3024667c34413b877993.js.map