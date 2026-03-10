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
exports.ShipsController = void 0;
const common_1 = require("@nestjs/common");
const ships_service_1 = require("./ships.service");
const create_ship_dto_1 = require("./dto/create-ship.dto");
const update_ship_dto_1 = require("./dto/update-ship.dto");
const ship_entity_1 = require("./entities/ship.entity");
let ShipsController = class ShipsController {
    shipsService;
    constructor(shipsService) {
        this.shipsService = shipsService;
    }
    create(createShipDto) {
        return this.shipsService.create(createShipDto);
    }
    findAll() {
        return this.shipsService.findAll();
    }
    findSailing() {
        return this.shipsService.findSailing();
    }
    findOne(id) {
        return this.shipsService.findOne(id);
    }
    update(id, updateShipDto) {
        return this.shipsService.update(id, updateShipDto);
    }
};
exports.ShipsController = ShipsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_ship_dto_1.CreateShipDto]),
    __metadata("design:returntype", ship_entity_1.Ship)
], ShipsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], ShipsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('sailing'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Array)
], ShipsController.prototype, "findSailing", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", ship_entity_1.Ship)
], ShipsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_ship_dto_1.UpdateShipDto]),
    __metadata("design:returntype", ship_entity_1.Ship)
], ShipsController.prototype, "update", null);
exports.ShipsController = ShipsController = __decorate([
    (0, common_1.Controller)('ships'),
    __metadata("design:paramtypes", [ships_service_1.ShipsService])
], ShipsController);
//# sourceMappingURL=ships.controller.js.map