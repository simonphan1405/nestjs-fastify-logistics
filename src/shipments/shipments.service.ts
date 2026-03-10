import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { AssignShipmentDto } from './dto/assign-shipment.dto';
import { UpdateShipmentStatusDto } from './dto/update-shipment-status.dto';
import { Shipment, ShipmentStatus } from './entities/shipment.entity';

@Injectable()
export class ShipmentsService {
  private shipments: Shipment[] = [
    {
      id: '1',
      cargoName: 'Cargo 1',
      weight: 1000,
      originPortId: '1',
      destinationPortId: '2',
      shipId: '1',
      status: ShipmentStatus.PENDING,
    },
    {
      id: '2',
      cargoName: 'Cargo 2',
      weight: 2000,
      originPortId: '2',
      destinationPortId: '3',
      shipId: '2',
      status: ShipmentStatus.LOADING,
    },
    {
      id: '3',
      cargoName: 'Cargo 3',
      weight: 1500,
      originPortId: '3',
      destinationPortId: '1',
      shipId: '3',
      status: ShipmentStatus.SAILING,
    },
    {
      id: '4',
      cargoName: 'Cargo 4',
      weight: 2500,
      originPortId: '4',
      destinationPortId: '1',
      shipId: '4',
      status: ShipmentStatus.DELIVERED,
    },
    {
      id: '5',
      cargoName: 'Cargo 5',
      weight: 2500,
      originPortId: '4',
      destinationPortId: '1',
      shipId: '4',
      status: ShipmentStatus.DELIVERED,
    },
  ];

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
