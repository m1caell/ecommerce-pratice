import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { ProductRepositoryImpl } from './product-impl.repository';
import { TypeOrmModuleDatabaseConfig } from 'src/config/database.config';

@Module({
  imports: [TypeOrmModuleDatabaseConfig, TypeOrmModule.forFeature([Product])],
  providers: [ProductRepositoryImpl],
  exports: [ProductRepositoryImpl],
})
export class RepositoriesModule {}
