import { prisma } from '../lib/prisma';
import { portsData } from './data/ports';
import { shipsData } from './data/ships';
import { shipmentsData } from './data/shipments';

async function seedPorts() {
  console.log('Seeding Ports...');
  const createdPorts = [];
  
  for (const port of portsData) {
    const p = await prisma.port.upsert({
      where: { name: port.name },
      update: port,
      create: port,
    });
    createdPorts.push(p);
  }
  
  return createdPorts;
}

async function seedShips() {
  console.log('Seeding Ships...');
  const createdShips = [];

  for (const ship of shipsData) {
    const s = await prisma.ship.upsert({
      where: { name: ship.name },
      update: ship,
      create: ship,
    });
    createdShips.push(s);
  }
  
  return createdShips;
}

async function seedShipments(ports: any[], ships: any[]) {
  console.log('Seeding Shipments...');
  
  // We'll map the partial data and fill in originPortId, destinationPortId, and shipId randomly based on our seed
  const fullShipments = shipmentsData.map((s, index) => {
    return {
      ...s,
      originPortId: ports[index % ports.length].id,
      destinationPortId: ports[(index + 1) % ports.length].id,
      shipId: index % 2 === 0 ? ships[index % ships.length].id : null, 
    };
  });

  const createdShipments = [];

  // Since we don't have a specific @unique logic for shipment, we can clear them or use cargoName as unique if we added it.
  // We'll clear them first since we didn't add @unique.
  await prisma.shipment.deleteMany();

  for (const shipment of fullShipments) {
    const s = await prisma.shipment.create({
      data: shipment,
    });
    createdShipments.push(s);
  }
  
  return createdShipments;
}

async function main() {
  const ports = await seedPorts();
  const ships = await seedShips();
  const shipments = await seedShipments(ports, ships);

  console.log(`Successfully seeded ${ports.length} ports, ${ships.length} ships, and ${shipments.length} shipments.`);
  console.log('✅ Seeding finished.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
