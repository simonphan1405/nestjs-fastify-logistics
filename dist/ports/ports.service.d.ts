import { CreatePortDto } from './dto/create-port.dto';
import { Port } from './entities/port.entity';
export declare class PortsService {
    private ports;
    create(createPortDto: CreatePortDto): Port;
    findAll(): Port[];
}
