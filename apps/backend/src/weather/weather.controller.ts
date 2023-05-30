import { Controller, Get, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  constructor(private weatherService: WeatherService) {}
  @Get('forecast')
  getForecastData(@Query() params: any): any {
    return this.weatherService.getForecastData(params.lat, params.lon);
  }
  @Get('current')
  getCurrentWeather(@Query() params: any): any {
    return this.weatherService.getCurrentWeather(params.lat, params.lon);
  }
  @Get('near-cities')
  getNearbyCitiesWeather(@Query() params: any): any {
    return this.weatherService.getNearbyCitiesWeather(
      params.lat,
      params.lon,
      params.cityId,
    );
  }
}
