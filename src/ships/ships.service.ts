import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { DatabaseService } from 'src/database/database.service';
import { ShipStatus } from 'generated/prisma/client';

/**
 * ShipsService contains the business logic for managing ships.
 * As an @Injectable(), it is registered in the NestJS Dependency Injection container
 * and can be injected into controllers or other services.
 */
@Injectable()
export class ShipsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createShipDto: CreateShipDto) {
    return this.databaseService.ship.create({
      data: createShipDto,
    });
  }

  async findAll() {
    return this.databaseService.ship.findMany();
  }

  async findSailing() {
    return this.databaseService.ship.findMany({
      where: {
        status: ShipStatus.SAILING,
      },
    });
  }

  async findOne(id: string) {
    const ship = await this.databaseService.ship.findUnique({
      where: { id },
    });
    if (!ship) {
      throw new NotFoundException(`Ship with ID ${id} not found`);
    }
    return ship;
  }

  async update(id: string, updateShipDto: UpdateShipDto) {
    await this.findOne(id);
    return this.databaseService.ship.update({
      where: { id },
      data: updateShipDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.databaseService.ship.delete({
      where: { id },
    });
  }
}
