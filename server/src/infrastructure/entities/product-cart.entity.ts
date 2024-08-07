import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProductEntity } from './product.entity';
import { CartEntity } from './cart.entity';

@Entity('product-cart')
export class ProductCartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  productId: number;

  @Column()
  cartId: number;

  @ManyToOne(() => ProductEntity, (product) => product.productsCart)
  product: ProductEntity;

  @ManyToOne(() => CartEntity, (cart) => cart.products)
  cart: CartEntity;
}
