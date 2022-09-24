System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Prefab, NodePool, instantiate, _dec, _dec2, _class, _class2, _descriptor, _class3, _crd, ccclass, property, ObjectFactory;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Prefab = _cc.Prefab;
      NodePool = _cc.NodePool;
      instantiate = _cc.instantiate;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "9999a8r/X5PPoWH5d0VruuF", "ObjectFactory", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Prefab', 'NodePool', 'Node', 'instantiate']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("ObjectFactory", ObjectFactory = (_dec = ccclass('ObjectFactory'), _dec2 = property({
        type: Prefab
      }), _dec(_class = (_class2 = (_class3 = class ObjectFactory extends Component {
        constructor() {
          super(...arguments);

          _initializerDefineProperty(this, "prefabs", _descriptor, this);

          this.pools = new Map();
        }

        onLoad() {
          ObjectFactory._instance = this;
        }

        start() {
          this.initSetAll();
        }

        initSetAll() {
          this.prefabs.forEach(prefab => {
            ObjectFactory.set(prefab.data.name);
          });
        }

        static get instance() {
          return ObjectFactory._instance;
        }

        static set(poolName) {
          ObjectFactory.instance.pools.set(poolName, new NodePool(poolName));
        }

        static get(poolName) {
          var pool = ObjectFactory.instance.pools.get(poolName);

          if (pool && pool.size() > 0) {
            for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              args[_key - 1] = arguments[_key];
            }

            return pool.get(args);
          } else {
            var prefab = ObjectFactory.instance.prefabs.find(prefab => prefab.name === poolName);

            if (prefab) {
              return instantiate(prefab);
            } else {
              return null;
            }
          }
        }

      }, _class3._instance = void 0, _class3), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "prefabs", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return [];
        }
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=62bc2753fdafe5061d45239e444570c12fb044d4.js.map