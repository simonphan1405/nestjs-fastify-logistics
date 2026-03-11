import { prisma } from '../lib/prisma';
import { portsData } from './data/ports';
import { shipsData } from './data/ships';

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

async function main() {
  const ports = await seedPorts();
  const ships = await seedShips();

  console.log(`Successfully seeded ${ports.length} ports and ${ships.length} ships.`);
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
