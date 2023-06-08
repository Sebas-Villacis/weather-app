import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto';
import { LocalAuthGuard } from './guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() dto: AuthDto) {
    return this.authService.signUp(dto);
  }
  /*  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() dto: AuthDto) {
    return this.authService.signIn(dto);
  } */
}
