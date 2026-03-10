import { Injectable } from '@nestjs/common';
import { CreatePortDto } from './dto/create-port.dto';
import { Port } from './entities/port.entity';

/**
 * PortsService handles operations related to Ports.
 */
@Injectable()
export class PortsService {
  private ports: Port[] = [];

  create(createPortDto: CreatePortDto): Port {
    const newPort: Port = {
      id: Date.now().toString(),
      ...createPortDto,
    };
    this.ports.push(newPort);
    return newPort;
  }

  findAll(): Port[] {
    return this.ports;
  }
}
