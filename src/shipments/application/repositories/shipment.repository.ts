import { Shipment, ShipmentStatus } from 'src/shipments/domain/entities/shipment.entity';

export abstract class IShipmentRepository {
  abstract create(cargoName: string, weight: number, originPortId: string, destinationPortId: string): Promise<Shipment>;
  abstract findAll(): Promise<Shipment[]>;
  abstract findById(id: string): Promise<Shipment | null>;
  abstract findByShipId(shipId: string): Promise<Shipment[]>;
  abstract assignToShip(id: string, shipId: string): Promise<Shipment>;
  abstract updateStatus(id: string, status: ShipmentStatus): Promise<Shipment>;
  abstract delete(id: string): Promise<void>;
}
