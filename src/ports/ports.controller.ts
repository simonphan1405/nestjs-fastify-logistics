import { Controller, Get, Post, Body } from '@nestjs/common';
import { PortsService } from './ports.service';
import { CreatePortDto } from './dto/create-port.dto';
import { Port } from './entities/port.entity';

@Controller('ports')
export class PortsController {
  constructor(private readonly portsService: PortsService) {}

  @Post()
  create(@Body() createPortDto: CreatePortDto) {
    return this.portsService.create(createPortDto);
  }

  @Get()
  findAll() {
    return this.portsService.findAll();
  }
}
