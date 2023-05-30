import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Observable, map, lastValueFrom } from 'rxjs';
import { GeolocationService } from 'src/geo-location/geo-location.service';

@Injectable()
export class WeatherService {
  constructor(
    private configService: ConfigService,
    private geolocationServce: GeolocationService,
    private httpService: HttpService,
  ) {}

  getForecastData(
    lat: string,
    lon: string,
    units = 'metric',
  ): Observable<AxiosResponse<any>> {
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
    lat: string,
    lon: string,
    units = 'metric',
  ): Observable<AxiosResponse<any>> {
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
    lat: string,
    lon: string,
    cityId: string,
    units = 'metric',
  ): Promise<any[]> {
    try {
      const nearCitiesLocations = await lastValueFrom(
        this.geolocationServce.getCitiesNearCity(cityId),
      );

      const nearCitiesWeather: any = await Promise.all(
        nearCitiesLocations.map(async (city: any) => {
          const cityWeather: any = await lastValueFrom(
            this.getCurrentWeather(city.latitude, city.longitude),
          );
          return {
            lat: city.latitude,
            lon: city.longitude,
            temp: cityWeather.main.temp,
          };
        }),
      );
      console.log({ nearCitiesWeather });
      return [...nearCitiesWeather];
    } catch (err) {
      console.log({ err });
      return [];
    }
  }
}
