import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CartEntity } from './cart.entity';

@Entity('product-cart')
export class ProductCartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ProductEntity, (product) => product.id)
  product: ProductEntity;

  @ManyToOne(() => CartEntity, (cart) => cart.id)
  cart: CartEntity;

  @Column()
  quantity: number;
}
