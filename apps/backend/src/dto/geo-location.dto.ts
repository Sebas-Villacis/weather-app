import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class GeoLocationDto {
  @IsString()
  @IsNotEmpty()
  q: string;
}

export class NearByLocationDto {
  @IsString()
  @IsNotEmpty()
  cityId: string;

  @IsNumber()
  @IsOptional()
  radius: number;
}
