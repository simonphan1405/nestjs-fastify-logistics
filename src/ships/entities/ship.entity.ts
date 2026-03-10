export enum ShipStatus {
  IDLE = 'idle',
  LOADING = 'loading',
  SAILING = 'sailing',
  MAINTENANCE = 'maintenance',
}

/**
 * Represents the Ship domain model.
 * In a real application, this might map to a database table using an ORM like TypeORM.
 */
export class Ship {
  id: string;
  name: string;
  captain: string;
  capacity: number;
  status: ShipStatus;
}
