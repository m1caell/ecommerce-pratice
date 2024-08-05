import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RepositoriesModule } from './infrastructure/repositories/repositories.module';
import { ControllersModule } from './infrastructure/controllers/controllers.module';
import { UseCasesProxyModule } from './infrastructure/use-cases-proxy/use-cases-proxy.module';
import environment from './config/environment';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [environment],
    }),
    RepositoriesModule,
    ControllersModule,
    UseCasesProxyModule,
  ],
})
export class AppModule {
  constructor() {}
}
