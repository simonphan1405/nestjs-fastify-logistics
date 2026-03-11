import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';

/**
 * ShipsController routes HTTP requests to the ShipsService.
 * It demonstrates how NestJS uses decorators for routing and dependency injection.
 */
@Controller('ships')
export class ShipsController {
  constructor(private readonly shipsService: ShipsService) {}

  @Post()
  create(@Body() createShipDto: CreateShipDto) {
    return this.shipsService.create(createShipDto);
  }

  @Get()
  findAll() {
    return this.shipsService.findAll();
  }

  @Get('sailing')
  findSailing() {
    return this.shipsService.findSailing();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shipsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShipDto: UpdateShipDto) {
    return this.shipsService.update(id, updateShipDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shipsService.remove(id);
  }
}
