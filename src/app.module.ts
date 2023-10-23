import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './db/database.config';
import { InternalApiGuard } from './guards/internal-api.guard';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) =>
        configService.get('database'),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: InternalApiGuard,
    },
  ],
})
export class AppModule {}
