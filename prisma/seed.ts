import { prisma } from '../lib/prisma';

async function main() {
  console.log('Start seeding ports...');

  const portsData = [
    { name: 'Shanghai Port', country: 'China' },
    { name: 'Singapore Port', country: 'Singapore' },
    { name: 'Port of Los Angeles', country: 'USA' },
    { name: 'Port of Rotterdam', country: 'Netherlands' },
    { name: 'Port of Busan', country: 'South Korea' },
  ];

  for (const p of portsData) {
    const port = await prisma.port.create({
      data: p,
    });
    console.log(`Created port with id: ${port.id}`);
  }

  console.log('Seeding finished.');
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
