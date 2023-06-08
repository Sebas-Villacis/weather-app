import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AxiosResponse } from 'axios';
import { Observable, map } from 'rxjs';
import { nearbyCitiesCoordType, locationType } from 'src/types';

@Injectable()
export class GeolocationService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  getGeolocationData(value: string): Observable<Array<locationType>> {
    return this.httpService
      .get(
        `${this.configService.get(
          'GEOLOCATION_API_DOMAIN',
        )}/v1/geo/cities?namePrefix=${value}&namePrefixDefaultLangResults:${true}&limit=10`,
        {
          headers: {
            'X-RapidAPI-Key': this.configService.get('GEOLOCATION_API_KEY'),
            'X-RapidAPI-Host': this.configService.get('GEOLOCATION_API_HOST'),
          },
        },
      )
      .pipe(map((response) => response.data.data));
  }

  getCitiesNearCity(
    cityId: string,
    radius = 100,
  ): Observable<Array<nearbyCitiesCoordType>> {
    return this.httpService
      .get(
        `${this.configService.get(
          'GEOLOCATION_API_DOMAIN',
        )}/v1/geo/cities/${cityId}/nearbyCities?radius=${radius}&limit=10`,
        {
          headers: {
            'X-RapidAPI-Key': this.configService.get('GEOLOCATION_API_KEY'),
            'X-RapidAPI-Host': this.configService.get('GEOLOCATION_API_HOST'),
          },
        },
      )
      .pipe(
        map((response) =>
          response.data.data.map((city) => {
            return { latitude: city.latitude, longitude: city.longitude };
          }),
        ),
      );
  }
}
