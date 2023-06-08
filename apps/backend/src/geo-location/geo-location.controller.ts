import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { GeolocationService } from './geo-location.service';
import { GeoLocationDto, NearByLocationDto } from 'src/dto';
import { AuthenticatedGuard } from 'src/auth/guard';

@Controller('geo')
export class GeolocationController {
  constructor(private geolocationService: GeolocationService) {}

  @UseGuards(AuthenticatedGuard)
  @Get('locations')
  getGeolocationData(@Query() params: GeoLocationDto) {
    return this.geolocationService.getGeolocationData(params.q);
  }
  @UseGuards(AuthenticatedGuard)
  @Get('nearby-cities')
  getCitiesNearCity(@Query() params: NearByLocationDto) {
    return this.geolocationService.getCitiesNearCity(params.cityId);
  }
}
