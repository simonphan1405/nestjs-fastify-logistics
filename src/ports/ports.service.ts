import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePortDto } from './dto/create-port.dto';
import { UpdatePortDto } from './dto/update-port.dto';
import { DatabaseService } from 'src/database/database.service';

/**
 * PortsService handles operations related to Ports.
 */
@Injectable()
export class PortsService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createPortDto: CreatePortDto) {
    return this.databaseService.port.create({
      data: createPortDto,
    });
  }

  async findAll() {
    return this.databaseService.port.findMany();
  }

  async findOne(id: string) {
    const port = await this.databaseService.port.findUnique({
      where: { id },
    });
    if (!port) {
      throw new NotFoundException(`Port with ID ${id} not found`);
    }
    return port;
  }

  async update(id: string, updatePortDto: UpdatePortDto) {
    await this.findOne(id);
    return this.databaseService.port.update({
      where: { id },
      data: updatePortDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.databaseService.port.delete({
      where: { id },
    });
  }
}
