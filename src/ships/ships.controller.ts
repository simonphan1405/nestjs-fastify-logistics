import { Controller, Get, Post, Body, Patch, Param } from '@nestjs/common';
import { ShipsService } from './ships.service';
import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { Ship } from './entities/ship.entity';

/**
 * ShipsController routes HTTP requests to the ShipsService.
 * It demonstrates how NestJS uses decorators for routing and dependency injection.
 */
@Controller('ships')
export class ShipsController {
  constructor(private readonly shipsService: ShipsService) {}

  @Post()
  create(@Body() createShipDto: CreateShipDto): Ship {
    return this.shipsService.create(createShipDto);
  }

  @Get()
  findAll(): Ship[] {
    return this.shipsService.findAll();
  }

  @Get('sailing')
  findSailing(): Ship[] {
    return this.shipsService.findSailing();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Ship {
    return this.shipsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShipDto: UpdateShipDto): Ship {
    return this.shipsService.update(id, updateShipDto);
  }
}
