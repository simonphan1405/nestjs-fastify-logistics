import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { AssignShipmentDto } from './dto/assign-shipment.dto';
import { UpdateShipmentStatusDto } from './dto/update-shipment-status.dto';
import { Shipment, ShipmentStatus } from './entities/shipment.entity';

@Injectable()
export class ShipmentsService {
  private shipments: Shipment[] = [];

  create(createShipmentDto: CreateShipmentDto): Shipment {
    const newShipment: Shipment = {
      id: Date.now().toString(),
      ...createShipmentDto,
      status: ShipmentStatus.PENDING,
    };
    this.shipments.push(newShipment);
    return newShipment;
  }

  assignToShip(id: string, assignShipmentDto: AssignShipmentDto): Shipment {
    const shipment = this.findOne(id);
    shipment.shipId = assignShipmentDto.shipId;
    shipment.status = ShipmentStatus.LOADING;
    return shipment;
  }

  getShipmentsOfShip(shipId: string): Shipment[] {
    return this.shipments.filter((s) => s.shipId === shipId);
  }

  updateStatus(
    id: string,
    updateShipmentStatusDto: UpdateShipmentStatusDto,
  ): Shipment {
    const shipment = this.findOne(id);
    shipment.status = updateShipmentStatusDto.status;
    return shipment;
  }

  findOne(id: string): Shipment {
    const shipment = this.shipments.find((s) => s.id === id);
    if (!shipment) {
      throw new NotFoundException(`Shipment with ID ${id} not found`);
    }
    return shipment;
  }
}
