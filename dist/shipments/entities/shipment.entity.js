"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Shipment = exports.ShipmentStatus = void 0;
var ShipmentStatus;
(function (ShipmentStatus) {
    ShipmentStatus["PENDING"] = "pending";
    ShipmentStatus["LOADING"] = "loading";
    ShipmentStatus["SAILING"] = "sailing";
    ShipmentStatus["DELIVERED"] = "delivered";
})(ShipmentStatus || (exports.ShipmentStatus = ShipmentStatus = {}));
class Shipment {
    id;
    cargoName;
    weight;
    originPortId;
    destinationPortId;
    shipId;
    status;
}
exports.Shipment = Shipment;
//# sourceMappingURL=shipment.entity.js.map