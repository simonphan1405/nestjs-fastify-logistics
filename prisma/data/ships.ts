import { ShipStatus } from '../../generated/prisma/client';

export const shipsData = [
  {
    name: 'Black Pearl',
    captain: 'Jack Sparrow',
    capacity: 1000,
    status: ShipStatus.SAILING,
  },
  {
    name: 'Flying Dutchman',
    captain: 'Davy Jones',
    capacity: 2000,
    status: ShipStatus.MAINTENANCE,
  },
  {
    name: "Queen Anne's Revenge",
    captain: 'Blackbeard',
    capacity: 1500,
    status: ShipStatus.LOADING,
  },
  {
    name: 'Empress',
    captain: 'Sao Feng',
    capacity: 1200,
    status: ShipStatus.IDLE,
  },
  {
    name: 'Silent Mary',
    captain: 'Armando Salazar',
    capacity: 2500,
    status: ShipStatus.SAILING,
  },
];
