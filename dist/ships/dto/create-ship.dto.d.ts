import { ShipStatus } from '../entities/ship.entity';
export declare class CreateShipDto {
    name: string;
    captain: string;
    capacity: number;
    status: ShipStatus;
}
