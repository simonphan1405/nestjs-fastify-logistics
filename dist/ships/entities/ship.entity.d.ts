export declare enum ShipStatus {
    IDLE = "idle",
    LOADING = "loading",
    SAILING = "sailing",
    MAINTENANCE = "maintenance"
}
export declare class Ship {
    id: string;
    name: string;
    captain: string;
    capacity: number;
    status: ShipStatus;
}
