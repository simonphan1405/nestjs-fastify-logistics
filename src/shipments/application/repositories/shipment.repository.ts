import { Shipment } from 'src/shipments/domain/entities/shipment.entity';

export abstract class IShipmentRepository {
  abstract save(shipment: Shipment): Promise<void>;
}
