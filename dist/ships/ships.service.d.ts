import { CreateShipDto } from './dto/create-ship.dto';
import { UpdateShipDto } from './dto/update-ship.dto';
import { Ship } from './entities/ship.entity';
export declare class ShipsService {
    private ships;
    create(createShipDto: CreateShipDto): Ship;
    findAll(): Ship[];
    findSailing(): Ship[];
    findOne(id: string): Ship;
    update(id: string, updateShipDto: UpdateShipDto): Ship;
}
