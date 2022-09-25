System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, geometry, input, Input, PhysicsSystem, IngameManager, _dec, _class, _crd, ccclass, property, Coin;

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
    }, function (_unresolved_2) {
      IngameManager = _unresolved_2.IngameManager;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "86ff5wEz5FLGIjLASjzFx+v", "Coin", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'EventTouch', 'geometry', 'Camera', 'input', 'Input', 'PhysicsSystem', 'Vec3']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Coin", Coin = (_dec = ccclass('Coin'), _dec(_class = class Coin extends Component {
        constructor() {
          super(...arguments);
          this._ray = new geometry.Ray();
        }

        onEnable() {
          input.on(Input.EventType.TOUCH_MOVE, this.onMove, this);
        }

        onDisable() {
          input.off(Input.EventType.TOUCH_MOVE, this.onMove, this);
        }

        onMove(event) {
          var touch = event.touch;
          (_crd && IngameManager === void 0 ? (_reportPossibleCrUseOfIngameManager({
            error: Error()
          }), IngameManager) : IngameManager).camera.screenPointToRay(touch.getLocationX(), touch.getLocationY(), this._ray);

          if (PhysicsSystem.instance.raycast(this._ray)) {
            var raycastResults = PhysicsSystem.instance.raycastResults;

            for (var i = 0; i < raycastResults.length; i++) {
              var item = raycastResults[i];

              if (item.collider.node == this.node) {
                this.drag(item.hitPoint);
                break;
              }
            }
          } else {
            console.log('raycast does not hit the target node !');
          }
        }

        drag(hitPoint) {
          this.node.setPosition(Math.round(hitPoint.x), 0, Math.round(hitPoint.z));
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=31ee56bd57bc33f4876387cbbe2c11f2ab5bc2e7.js.map