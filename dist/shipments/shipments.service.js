"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentsService = void 0;
const common_1 = require("@nestjs/common");
const shipment_entity_1 = require("./entities/shipment.entity");
let ShipmentsService = class ShipmentsService {
    shipments = [];
    create(createShipmentDto) {
        const newShipment = {
            id: Date.now().toString(),
            ...createShipmentDto,
            status: shipment_entity_1.ShipmentStatus.PENDING,
        };
        this.shipments.push(newShipment);
        return newShipment;
    }
    assignToShip(id, assignShipmentDto) {
        const shipment = this.findOne(id);
        shipment.shipId = assignShipmentDto.shipId;
        shipment.status = shipment_entity_1.ShipmentStatus.LOADING;
        return shipment;
    }
    getShipmentsOfShip(shipId) {
        return this.shipments.filter((s) => s.shipId === shipId);
    }
    updateStatus(id, updateShipmentStatusDto) {
        const shipment = this.findOne(id);
        shipment.status = updateShipmentStatusDto.status;
        return shipment;
    }
    findOne(id) {
        const shipment = this.shipments.find((s) => s.id === id);
        if (!shipment) {
            throw new common_1.NotFoundException(`Shipment with ID ${id} not found`);
        }
        return shipment;
    }
};
exports.ShipmentsService = ShipmentsService;
exports.ShipmentsService = ShipmentsService = __decorate([
    (0, common_1.Injectable)()
], ShipmentsService);
//# sourceMappingURL=shipments.service.js.map