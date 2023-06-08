import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class ForecastDto {
  @Transform(({ value }) => Number(value))
  @IsNumber()
  lat: number;

  @Transform(({ value }) => Number(value))
  @IsNumber()
  lon: number;

  @IsString()
  @IsOptional()
  units: string;
}

export class ForecastCitiesDto {
  @IsString()
  @IsNotEmpty()
  cityId: string;

  @IsString()
  @IsOptional()
  units: string;
}
