"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateShipDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_ship_dto_1 = require("./create-ship.dto");
class UpdateShipDto extends (0, mapped_types_1.PartialType)(create_ship_dto_1.CreateShipDto) {
}
exports.UpdateShipDto = UpdateShipDto;
//# sourceMappingURL=update-ship.dto.js.map