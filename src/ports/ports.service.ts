import { Injectable } from '@nestjs/common';
import { CreatePortDto } from './dto/create-port.dto';
import { Port } from './entities/port.entity';
import { prisma } from '../../lib/prisma';
import { Prisma } from 'generated/prisma/client';

/**
 * PortsService handles operations related to Ports.
 */
@Injectable()
export class PortsService {
  create(createPortDto: Prisma.PortCreateInput) {
    return prisma.port.create({
      data: createPortDto,
    });
  }

  findAll() {
    return prisma.port.findMany();
  }
}
