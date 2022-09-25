System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, geometry, input, Input, PhysicsSystem, tween, Vec3, IngameManager, _dec, _class, _crd, ccclass, property, Coin;

  function _reportPossibleCrUseOfIngameManager(extras) {
    _reporterNs.report("IngameManager", "./IngameManager", _context.meta, extras);
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
      geometry = _cc.geometry;
      input = _cc.input;
      Input = _cc.Input;
      PhysicsSystem = _cc.PhysicsSystem;
      tween = _cc.tween;
      Vec3 = _cc.Vec3;
    }, function (_unresolved_2) {
      IngameManager = _unresolved_2.IngameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "86ff5wEz5FLGIjLASjzFx+v", "Coin", undefined);

      __checkObsolete__(['_decorator', 'Component', 'EventTouch', 'geometry', 'input', 'Input', 'PhysicsSystem', 'physics', 'tween', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Coin", Coin = (_dec = ccclass('Coin'), _dec(_class = class Coin extends Component {
        constructor(...args) {
          super(...args);
          this._ray = new geometry.Ray();
        }

        onEnable() {
          input.on(Input.EventType.TOUCH_MOVE, this.onMove, this);
          input.on(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        }

        onDisable() {
          input.off(Input.EventType.TOUCH_MOVE, this.onMove, this);
          input.off(Input.EventType.TOUCH_END, this.onTouchEnd, this);
        }

        onMove(event) {
          this.raycast(event, this.drag.bind(this));
        }

        onTouchEnd(event) {
          this.raycast(event, this.setTilePosition.bind(this));
        }

        drag(item) {
          this.node.setPosition(item.hitPoint.x, 0, item.hitPoint.z);
        }

        setTilePosition(item) {
          let x = Math.min(Math.round(item.hitPoint.x), (_crd && IngameManager === void 0 ? (_reportPossibleCrUseOfIngameManager({
            error: Error()
          }), IngameManager) : IngameManager).mapSetting.maxRow / 2 - 1);
          let z = Math.min(Math.round(item.hitPoint.z), (_crd && IngameManager === void 0 ? (_reportPossibleCrUseOfIngameManager({
            error: Error()
          }), IngameManager) : IngameManager).mapSetting.maxCol / 2 - 1);
          x = x < (_crd && IngameManager === void 0 ? (_reportPossibleCrUseOfIngameManager({
            error: Error()
          }), IngameManager) : IngameManager).mapSetting.startRow ? (_crd && IngameManager === void 0 ? (_reportPossibleCrUseOfIngameManager({
            error: Error()
          }), IngameManager) : IngameManager).mapSetting.startRow : x;
          z = z < (_crd && IngameManager === void 0 ? (_reportPossibleCrUseOfIngameManager({
            error: Error()
          }), IngameManager) : IngameManager).mapSetting.startCol ? (_crd && IngameManager === void 0 ? (_reportPossibleCrUseOfIngameManager({
            error: Error()
          }), IngameManager) : IngameManager).mapSetting.startCol : z;
          tween().target(this.node).to(0.25, {
            position: new Vec3(x, 0, z),
            easing: 'quadIn'
          }).start();
        }

        raycast(event, hit, miss) {
          const touch = event.touch;
          (_crd && IngameManager === void 0 ? (_reportPossibleCrUseOfIngameManager({
            error: Error()
          }), IngameManager) : IngameManager).camera.screenPointToRay(touch.getLocationX(), touch.getLocationY(), this._ray);

          if (PhysicsSystem.instance.raycast(this._ray)) {
            const raycastResults = PhysicsSystem.instance.raycastResults;

            for (let i = 0; i < raycastResults.length; i++) {
              const item = raycastResults[i];

              if (item.collider.node == this.node) {
                hit(item);
                break;
              }
            }
          } else {
            miss && miss();
          }
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4e3d58f62ab1a97a12f43dbc512d6c1ac20c8803.js.map