import { Injectable } from '@nestjs/common';
import { CreatePortDto } from './dto/create-port.dto';
import { Port } from './entities/port.entity';

/**
 * PortsService handles operations related to Ports.
 */
@Injectable()
export class PortsService {
  private ports: Port[] = [
    {
      id: '1',
      name: 'Port 1',
      country: 'Country 1',
    },
    {
      id: '2',
      name: 'Port 2',
      country: 'Country 2',
    },
    {
      id: '3',
      name: 'Port 3',
      country: 'Country 3',
    },
    {
      id: '4',
      name: 'Port 4',
      country: 'Country 4',
    },
    {
      id: '5',
      name: 'Port 5',
      country: 'Country 5',
    },
  ];

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
