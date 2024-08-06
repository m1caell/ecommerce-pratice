import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductEntity } from '../entities/product.entity';
import { ProductRepositoryImpl } from './product-impl.repository';
import { TypeOrmModuleDatabaseConfig } from 'src/config/database.config';
import { CartEntity } from '../entities/cart.entity';
import { ProductCartEntity } from '../entities/product-cart.entity';
import { CartRepositoryImpl } from './cart-impl.repository';

@Module({
  imports: [
    TypeOrmModuleDatabaseConfig,
    TypeOrmModule.forFeature([ProductEntity, CartEntity, ProductCartEntity]),
  ],
  providers: [ProductRepositoryImpl, CartRepositoryImpl],
  exports: [ProductRepositoryImpl, CartRepositoryImpl],
})
export class RepositoriesModule {}
