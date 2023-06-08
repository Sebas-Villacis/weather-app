import { ForbiddenException, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prismaService: PrismaService) {}

  async findOne(userEmail: string): Promise<User | undefined> {
    return this.prismaService.user.findUnique({
      where: {
        email: userEmail,
      },
    });
  }
}
