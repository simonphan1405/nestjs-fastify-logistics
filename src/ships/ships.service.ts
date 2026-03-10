import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { Ship, ShipStatus } from './entities/ship.entity';

/**
 * ShipsService contains the business logic for managing ships.
 * As an @Injectable(), it is registered in the NestJS Dependency Injection container
 * and can be injected into controllers or other services.
 */
@Injectable()
export class ShipsService {
  // Simple in-memory database
  private ships: Ship[] = [];

  create(createShipDto: CreateShipDto): Ship {
    const newShip: Ship = {
      id: Date.now().toString(),
      ...createShipDto,
    };
    this.ships.push(newShip);
    return newShip;
  }

  findAll(): Ship[] {
    return this.ships;
  }

  findSailing(): Ship[] {
    return this.ships.filter((ship) => ship.status === ShipStatus.SAILING);
  }

  findOne(id: string): Ship {
    const ship = this.ships.find((s) => s.id === id);
    if (!ship) {
      throw new NotFoundException(`Ship with ID ${id} not found`);
    }
    return ship;
  }

  update(id: string, updateShipDto: UpdateShipDto): Ship {
    const ship = this.findOne(id);
    Object.assign(ship, updateShipDto);
    return ship;
  }
}
