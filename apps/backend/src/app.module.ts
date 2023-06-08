import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { LoggerModule } from 'nestjs-pino';
import helmet from 'helmet';
import { AuthModule } from './auth/auth.module';
import { GeoLocationModule } from './geo-location/geo-location.module';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { WeatherModule } from './weather/weather.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 10,
    }),
    LoggerModule.forRoot({
      pinoHttp: {
        /**
         * Each HTTP log that comes through on each
         *  request will include in the object { "context":"HTTP" }
         */
        customProps: (req, res) => ({
          context: 'HTTP',
        }),
        autoLogging: false,
        transport:
          process.env.NODE_ENV === 'development'
            ? {
                target: 'pino-pretty',
                options: {
                  messageKey: 'message',
                  singleLine: true,
                  colorize: true,
                },
              }
            : undefined,
        messageKey: 'message',
      },
    }),
    WeatherModule,
    GeoLocationModule,
    AuthModule,
    UserModule,
    PrismaModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(helmet()).forRoutes('*');
  }
}
