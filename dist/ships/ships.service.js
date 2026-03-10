"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShipsService = void 0;
const common_1 = require("@nestjs/common");
const ship_entity_1 = require("./entities/ship.entity");
let ShipsService = class ShipsService {
    ships = [];
    create(createShipDto) {
        const newShip = {
            id: Date.now().toString(),
            ...createShipDto,
        };
        this.ships.push(newShip);
        return newShip;
    }
    findAll() {
        return this.ships;
    }
    findSailing() {
        return this.ships.filter((ship) => ship.status === ship_entity_1.ShipStatus.SAILING);
    }
    findOne(id) {
        const ship = this.ships.find((s) => s.id === id);
        if (!ship) {
            throw new common_1.NotFoundException(`Ship with ID ${id} not found`);
        }
        return ship;
    }
    update(id, updateShipDto) {
        const ship = this.findOne(id);
        Object.assign(ship, updateShipDto);
        return ship;
    }
};
exports.ShipsService = ShipsService;
exports.ShipsService = ShipsService = __decorate([
    (0, common_1.Injectable)()
], ShipsService);
//# sourceMappingURL=ships.service.js.map