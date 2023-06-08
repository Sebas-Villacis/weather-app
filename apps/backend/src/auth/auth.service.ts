import { ForbiddenException, Injectable, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';

import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto } from './dto';
import { LocalAuthGuard } from './guard';
import { UsersService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private userService: UsersService,
  ) {}

  async validateUser(username: string, password: string) {
    //find the user by email
    const user = await this.userService.findOne(username);
    // compare password
    const pwMatches = await bcrypt.compare(password, user.hash);
    if (user) {
      delete user.hash;
      return user;
    }

    return null;
  }

  async signUp(dto: AuthDto) {
    // generate the password
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(dto.password, saltOrRounds);
    //save the new user in the db
    try {
      const user = await this.prismaService.user.create({
        data: {
          email: dto.email,
          hash: hashedPassword,
        },
      });

      return {
        userId: user.id,
        userEmail: user.email,
        msg: 'User successfully registered',
      };
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credentials taken');
        }
      }
      throw error;
    }
  }

  @UseGuards(LocalAuthGuard)
  async signIn(dto: AuthDto) {
    //find the user by email
    const user = await this.prismaService.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    //if user does not exists throw exception
    if (!user) throw new ForbiddenException('Credentials incorrect');
    // compare password
    const pwMatches = await bcrypt.compare(dto.password, user.hash);

    //if password incorrect throw exception
    if (!pwMatches) throw new ForbiddenException('Credentials incorrect');

    return {
      user: dto.email,
      msg: 'User logged in',
    };
  }
}
