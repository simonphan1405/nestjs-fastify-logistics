"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipmentsController = void 0;
const common_1 = require("@nestjs/common");
const shipments_service_1 = require("./shipments.service");
const create_shipment_dto_1 = require("./dto/create-shipment.dto");
const assign_shipment_dto_1 = require("./dto/assign-shipment.dto");
const update_shipment_status_dto_1 = require("./dto/update-shipment-status.dto");
const shipment_entity_1 = require("./entities/shipment.entity");
let ShipmentsController = class ShipmentsController {
    shipmentsService;
    constructor(shipmentsService) {
        this.shipmentsService = shipmentsService;
    }
    create(createShipmentDto) {
        return this.shipmentsService.create(createShipmentDto);
    }
    assignToShip(id, assignShipmentDto) {
        return this.shipmentsService.assignToShip(id, assignShipmentDto);
    }
    getShipmentsOfShip(shipId) {
        return this.shipmentsService.getShipmentsOfShip(shipId);
    }
    updateStatus(id, updateShipmentStatusDto) {
        return this.shipmentsService.updateStatus(id, updateShipmentStatusDto);
    }
};
exports.ShipmentsController = ShipmentsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_shipment_dto_1.CreateShipmentDto]),
    __metadata("design:returntype", shipment_entity_1.Shipment)
], ShipmentsController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id/assign'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_shipment_dto_1.AssignShipmentDto]),
    __metadata("design:returntype", shipment_entity_1.Shipment)
], ShipmentsController.prototype, "assignToShip", null);
__decorate([
    (0, common_1.Get)('ship/:shipId'),
    __param(0, (0, common_1.Param)('shipId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Array)
], ShipmentsController.prototype, "getShipmentsOfShip", null);
__decorate([
    (0, common_1.Patch)(':id/status'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_shipment_status_dto_1.UpdateShipmentStatusDto]),
    __metadata("design:returntype", shipment_entity_1.Shipment)
], ShipmentsController.prototype, "updateStatus", null);
exports.ShipmentsController = ShipmentsController = __decorate([
    (0, common_1.Controller)('shipments'),
    __metadata("design:paramtypes", [shipments_service_1.ShipmentsService])
], ShipmentsController);
//# sourceMappingURL=shipments.controller.js.map