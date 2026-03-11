import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePortDto } from './dto/create-port.dto';
import { UpdatePortDto } from './dto/update-port.dto';
import { prisma } from '../../lib/prisma';

/**
 * PortsService handles operations related to Ports.
 */
@Injectable()
export class PortsService {
  async create(createPortDto: CreatePortDto) {
    return prisma.port.create({
      data: createPortDto,
    });
  }

  async findAll() {
    return prisma.port.findMany();
  }

  async findOne(id: string) {
    const port = await prisma.port.findUnique({
      where: { id },
    });
    if (!port) {
      throw new NotFoundException(`Port with ID ${id} not found`);
    }
    return port;
  }

  async update(id: string, updatePortDto: UpdatePortDto) {
    await this.findOne(id);
    return prisma.port.update({
      where: { id },
      data: updatePortDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return prisma.port.delete({
      where: { id },
    });
  }
}
