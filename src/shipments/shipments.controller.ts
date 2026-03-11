import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ShipmentsService } from './shipments.service';
import { CreateShipmentDto } from './dto/create-shipment.dto';
import { AssignShipmentDto } from './dto/assign-shipment.dto';
import { UpdateShipmentStatusDto } from './dto/update-shipment-status.dto';
import { UpdateShipmentDto } from './dto/update-shipment.dto';

@Controller('shipments')
export class ShipmentsController {
  constructor(private readonly shipmentsService: ShipmentsService) {}

  @Post()
  create(@Body() createShipmentDto: CreateShipmentDto) {
    return this.shipmentsService.create(createShipmentDto);
  }

  @Get()
  findAll() {
    return this.shipmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipmentsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShipmentDto: UpdateShipmentDto) {
    // This calls a generic update, but to implement the custom methods instead:
    // UpdateShipmentDto could be added to service, but we have specific methods below
    throw new Error('Please use specific endpoints for assignment and status');
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipmentsService.remove(id);
  }

  @Patch(':id/assign')
  assignToShip(
    @Param('id') id: string,
    @Body() assignShipmentDto: AssignShipmentDto,
  ) {
    return this.shipmentsService.assignToShip(id, assignShipmentDto);
  }

  @Get('ship/:shipId')
  getShipmentsOfShip(@Param('shipId') shipId: string) {
    return this.shipmentsService.getShipmentsOfShip(shipId);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() updateShipmentStatusDto: UpdateShipmentStatusDto,
  ) {
    return this.shipmentsService.updateStatus(id, updateShipmentStatusDto);
  }
}
