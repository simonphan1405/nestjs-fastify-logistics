import { PortsService } from './ports.service';
import { CreatePortDto } from './dto/create-port.dto';
import { Port } from './entities/port.entity';
export declare class PortsController {
    private readonly portsService;
    constructor(portsService: PortsService);
    create(createPortDto: CreatePortDto): Port;
    findAll(): Port[];
}
