import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Logger } from 'nestjs-pino';
import { PrismaService } from 'src/prisma/prisma.service';

import { UsersService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private userService: UsersService,
    private logger: Logger,
  ) {}

  async validateUser(username: string, password: string) {
    this.logger.log(`Validating user ...`);
    //find the user by email
    const user = await this.userService.findOne(username);
    console.log({ user });
    // compare password
    const pwMatches = await bcrypt.compare(password, user.hash);
    if (user && pwMatches) {
      delete user.hash;
      return user;
    }

    return null;
  }
}
