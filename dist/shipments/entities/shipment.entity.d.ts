export declare enum ShipmentStatus {
    PENDING = "pending",
    LOADING = "loading",
    SAILING = "sailing",
    DELIVERED = "delivered"
}
export declare class Shipment {
    id: string;
    cargoName: string;
    weight: number;
    originPortId: string;
    destinationPortId: string;
    shipId?: string;
    status: ShipmentStatus;
}
