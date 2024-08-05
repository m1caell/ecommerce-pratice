import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

export const TypeOrmModuleDatabaseConfig = TypeOrmModule.forRootAsync({
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get<string>('database.host'),
    port: configService.get<number>('database.port'),
    username: configService.get<string>('database.user'),
    password: configService.get<string>('database.password'),
    database: configService.get<string>('database.schema'),
    autoLoadEntities: true,
    synchronize: true,
    retryAttempts: 10,
    retryDelay: 3000,
  }),
  inject: [ConfigService],
});
