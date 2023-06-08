import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { response } from 'express';
import { Logger } from 'nestjs-pino';
import {
  Observable,
  map,
  lastValueFrom,
  firstValueFrom,
  take,
  tap,
} from 'rxjs';
import { GeolocationService } from 'src/geo-location/geo-location.service';
import {
  currentWeatherType,
  forecastWeatherType,
  nearbyCitiesCoordType,
  nearbyCitiesWeatherType,
} from 'src/types';

@Injectable()
export class WeatherService {
  constructor(
    private configService: ConfigService,
    private geolocationServce: GeolocationService,
    private httpService: HttpService,
    private logger: Logger,
  ) {}

  getForecastData(
    lat: number,
    lon: number,
    units = 'metric',
  ): Observable<forecastWeatherType> {
    return this.httpService
      .get(
        `${this.configService.get(
          'WEATHER_API_DOMAIN',
        )}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${this.configService.get(
          'WEATHER_API_KEY',
        )}`,
      )
      .pipe(map((response) => response.data));
  }

  getCurrentWeather(
    lat: number,
    lon: number,
    units = 'metric',
  ): Observable<currentWeatherType> {
    return this.httpService
      .get(
        `${this.configService.get(
          'WEATHER_API_DOMAIN',
        )}/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${this.configService.get(
          'WEATHER_API_KEY',
        )}`,
      )
      .pipe(map((response) => response.data));
  }

  async getNearbyCitiesWeather(
    cityId: string,
    units = 'metric',
  ): Promise<nearbyCitiesWeatherType[]> {
    try {
      const nearCitiesLocations = await lastValueFrom(
        this.geolocationServce.getCitiesNearCity(cityId),
      );

      const nearCitiesWeather: Array<nearbyCitiesWeatherType> =
        await Promise.all(
          nearCitiesLocations.map(async (city: nearbyCitiesCoordType) => {
            const cityWeather = await lastValueFrom(
              this.getCurrentWeather(city.latitude, city.longitude, units),
            );
            return {
              lat: city.latitude,
              lon: city.longitude,
              temp: cityWeather.main.temp,
            };
          }),
        );
      return [...nearCitiesWeather];
    } catch (err) {
      this.logger.error(err);
      return [];
    }
  }
}
