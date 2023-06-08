import { Controller, Post, Request, UseGuards } from '@nestjs/common';

import { LocalAuthGuard } from 'src/auth/guard';

@Controller('users')
export class UserController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() req): any {
    return { msg: 'Logged in!' };
  }
}
