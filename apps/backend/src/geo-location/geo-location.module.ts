import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GeolocationController } from './geo-location.controller';
import { GeolocationService } from './geo-location.service';

@Module({
  imports: [HttpModule],
  controllers: [GeolocationController],
  providers: [GeolocationService],
})
export class GeoLocationModule {}
