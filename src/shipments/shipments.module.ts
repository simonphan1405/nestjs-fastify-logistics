import { Module } from '@nestjs/common';
import { ShipmentsController } from './shipments.controller';
import { DatabaseModule } from 'src/database/database.module';
import { CreateShipmentUseCase } from './application/use-cases/create-shipment.use-case';
import { GetAllShipmentsUseCase } from './application/use-cases/get-all-shipments.use-case';
import { GetShipmentByIdUseCase } from './application/use-cases/get-shipment-by-id.use-case';
import { GetShipmentsByShipUseCase } from './application/use-cases/get-shipments-by-ship.use-case';
import { AssignShipmentUseCase } from './application/use-cases/assign-shipment.use-case';
import { UpdateShipmentStatusUseCase } from './application/use-cases/update-shipment-status.use-case';
import { DeleteShipmentUseCase } from './application/use-cases/delete-shipment.use-case';
import { IShipmentRepository } from './application/repositories/shipment.repository';
import { PrismaShipmentRepository } from './infrastructure/repositories/prisma-shipment.repository';

@Module({
  imports: [DatabaseModule],
  controllers: [ShipmentsController],
  providers: [
    CreateShipmentUseCase,
    GetAllShipmentsUseCase,
    GetShipmentByIdUseCase,
    GetShipmentsByShipUseCase,
    AssignShipmentUseCase,
    UpdateShipmentStatusUseCase,
    DeleteShipmentUseCase,
    {
      provide: IShipmentRepository,
      useClass: PrismaShipmentRepository,
    },
  ],
})
export class ShipmentsModule {}
