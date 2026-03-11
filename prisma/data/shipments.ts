import { ShipmentStatus } from '../../generated/prisma/client';

export const shipmentsData = [
  {
    cargoName: 'Electronics to LA',
    weight: 1000,
    status: ShipmentStatus.PENDING,
  },
  {
    cargoName: 'Furniture to Rotterdam',
    weight: 2000,
    status: ShipmentStatus.LOADING,
  },
  {
    cargoName: 'Machinery to Busan',
    weight: 1500,
    status: ShipmentStatus.SAILING,
  },
  {
    cargoName: 'Textiles to Singapore',
    weight: 2500,
    status: ShipmentStatus.DELIVERED,
  },
  {
    cargoName: 'Automobiles to Shanghai',
    weight: 2500,
    status: ShipmentStatus.DELIVERED,
  },
];
