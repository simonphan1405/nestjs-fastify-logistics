import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ShipsModule } from './ships/ships.module';
import { PortsModule } from './ports/ports.module';
import { ShipmentsModule } from './shipments/shipments.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [ShipsModule, PortsModule, ShipmentsModule, DatabaseModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
