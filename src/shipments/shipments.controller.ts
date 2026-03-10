import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { AssignShipmentDto } from './dto/assign-shipment.dto';
import { UpdateShipmentStatusDto } from './dto/update-shipment-status.dto';
import { Shipment } from './entities/shipment.entity';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post()
  create(@Body() createShipmentDto: CreateShipmentDto): Shipment {
    return this.shipmentsService.create(createShipmentDto);
  }

  @Patch(':id/assign')
  assignToShip(
    @Param('id') id: string,
    @Body() assignShipmentDto: AssignShipmentDto,
  ): Shipment {
    return this.shipmentsService.assignToShip(id, assignShipmentDto);
  }

  @Get('ship/:shipId')
  getShipmentsOfShip(@Param('shipId') shipId: string): Shipment[] {
    return this.shipmentsService.getShipmentsOfShip(shipId);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateShipmentStatusDto: UpdateShipmentStatusDto,
  ): Shipment {
    return this.shipmentsService.updateStatus(id, updateShipmentStatusDto);
  }
}
