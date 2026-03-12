import { Module } from '@nestjs/common';
import { ShipmentsController } from './shipments.controller';
import { ShipmentsService } from './shipments.service';
import { DatabaseModule } from 'src/database/database.module';
import { CreateShipmentUseCase } from './application/use-cases/create-shipment.use-case';
import { IShipmentRepository } from './application/repositories/shipment.repository';
import { PrismaShipmentRepository } from './infrastructure/repositories/prisma-shipment.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ShipmentsController],
  providers: [
    ShipmentsService,
    CreateShipmentUseCase,
    {
      provide: IShipmentRepository,
      useClass: PrismaShipmentRepository,
    },
  ],
})
export class ShipmentsModule {}
