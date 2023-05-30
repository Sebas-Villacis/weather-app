import { Controller, Get, Query } from '@nestjs/common';
import { GeolocationService } from './geo-location.service';

@Controller('geo')
export class GeolocationController {
  constructor(private geolocationService: GeolocationService) {}

  @Get('locations')
  getGeolocationData(@Query() params: any): any {
    return this.geolocationService.getGeolocationData(params.q);
  }
  @Get('nearby-cities')
  getCitiesNearCity(@Query() params: any): any {
    return this.geolocationService.getCitiesNearCity(params.cityId);
  }
}
