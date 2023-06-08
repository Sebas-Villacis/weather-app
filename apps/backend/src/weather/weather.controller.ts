import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { ForecastCitiesDto, ForecastDto } from 'src/dto';
import { AuthenticatedGuard } from 'src/auth/guard';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}
  @Get('forecast')
  getForecastData(@Query() params: ForecastDto) {
    return this.weatherService.getForecastData(
      params.lat,
      params.lon,
      params.units,
    );
  }

  @Get('current')
  getCurrentWeather(@Query() params: ForecastDto) {
    return this.weatherService.getCurrentWeather(
      params.lat,
      params.lon,
      params.units,
    );
  }

  @Get('near-cities')
  getNearbyCitiesWeather(@Query() params: ForecastCitiesDto) {
    return this.weatherService.getNearbyCitiesWeather(
      params.cityId,
      params.units,
    );
  }
}
