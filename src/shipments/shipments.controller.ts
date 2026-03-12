import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { AssignShipmentDto } from './dto/assign-shipment.dto';
import { UpdateShipmentStatusDto } from './dto/update-shipment-status.dto';
import { ShipmentStatus } from './domain/entities/shipment.entity';
import { CreateShipmentUseCase } from './application/use-cases/create-shipment.use-case';
import { GetAllShipmentsUseCase } from './application/use-cases/get-all-shipments.use-case';
import { GetShipmentByIdUseCase } from './application/use-cases/get-shipment-by-id.use-case';
import { GetShipmentsByShipUseCase } from './application/use-cases/get-shipments-by-ship.use-case';
import { AssignShipmentUseCase } from './application/use-cases/assign-shipment.use-case';
import { UpdateShipmentStatusUseCase } from './application/use-cases/update-shipment-status.use-case';
import { DeleteShipmentUseCase } from './application/use-cases/delete-shipment.use-case';

@Controller('shipments')
export class ShipmentsController {
  constructor(
    private readonly createShipmentUseCase: CreateShipmentUseCase,
    private readonly getAllShipmentsUseCase: GetAllShipmentsUseCase,
    private readonly getShipmentByIdUseCase: GetShipmentByIdUseCase,
    private readonly getShipmentsByShipUseCase: GetShipmentsByShipUseCase,
    private readonly assignShipmentUseCase: AssignShipmentUseCase,
    private readonly updateShipmentStatusUseCase: UpdateShipmentStatusUseCase,
    private readonly deleteShipmentUseCase: DeleteShipmentUseCase,
  ) {}

  @Post()
  async create(@Body() createShipmentDto: CreateShipmentDto) {
    return this.createShipmentUseCase.execute(
      createShipmentDto.cargoName,
      createShipmentDto.weight,
      createShipmentDto.originPortId,
      createShipmentDto.destinationPortId,
    );
  }

  @Get()
  findAll() {
    return this.getAllShipmentsUseCase.execute();
  }

  @Get('ship/:shipId')
  getShipmentsOfShip(@Param('shipId') shipId: string) {
    return this.getShipmentsByShipUseCase.execute(shipId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.getShipmentByIdUseCase.execute(id);
  }

  @Patch(':id/assign')
  assignToShip(
    @Param('id') id: string,
    @Body() assignShipmentDto: AssignShipmentDto,
  ) {
    return this.assignShipmentUseCase.execute(id, assignShipmentDto.shipId);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateShipmentStatusDto: UpdateShipmentStatusDto,
  ) {
    return this.updateShipmentStatusUseCase.execute(
      id,
      updateShipmentStatusDto.status as unknown as ShipmentStatus,
    );
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.deleteShipmentUseCase.execute(id);
  }
}

