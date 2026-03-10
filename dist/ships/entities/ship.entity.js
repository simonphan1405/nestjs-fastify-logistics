"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Ship = exports.ShipStatus = void 0;
var ShipStatus;
(function (ShipStatus) {
    ShipStatus["IDLE"] = "idle";
    ShipStatus["LOADING"] = "loading";
    ShipStatus["SAILING"] = "sailing";
    ShipStatus["MAINTENANCE"] = "maintenance";
})(ShipStatus || (exports.ShipStatus = ShipStatus = {}));
class Ship {
    id;
    name;
    captain;
    capacity;
    status;
}
exports.Ship = Ship;
//# sourceMappingURL=ship.entity.js.map