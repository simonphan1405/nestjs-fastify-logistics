import { CreateShipmentDto } from './dto/create-shipment.dto';
import { AssignShipmentDto } from './dto/assign-shipment.dto';
import { UpdateShipmentStatusDto } from './dto/update-shipment-status.dto';
import { Shipment } from './entities/shipment.entity';
export declare class ShipmentsService {
    private shipments;
    create(createShipmentDto: CreateShipmentDto): Shipment;
    assignToShip(id: string, assignShipmentDto: AssignShipmentDto): Shipment;
    getShipmentsOfShip(shipId: string): Shipment[];
    updateStatus(id: string, updateShipmentStatusDto: UpdateShipmentStatusDto): Shipment;
    findOne(id: string): Shipment;
}
