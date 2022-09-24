System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, Node, _dec, _class, _crd, ccclass, property, Coin;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "86ff5wEz5FLGIjLASjzFx+v", "Coin", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node', 'EventTouch']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("Coin", Coin = (_dec = ccclass('Coin'), _dec(_class = class Coin extends Component {
        start() {
          this.node.on(Node.EventType.TOUCH_MOVE, this.move, this);
        }

        update(deltaTime) {}

        move(event) {
          const originPosition = this.node.getWorldPosition();
          const newPosition = event.getLocation();
          this.node.setPosition(newPosition.x / 1000, originPosition.y, newPosition.y / 1000);
        }

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=09fe694e9cde1caac39c7cf50d8dfb14b75ec4c0.js.map