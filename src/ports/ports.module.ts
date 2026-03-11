import { Module } from '@nestjs/common';
import { PortsController } from './ports.controller';
import { PortsService } from './ports.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [PortsController],
  providers: [PortsService],
})
export class PortsModule {}
