import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCartEntity } from './product-cart.entity';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ProductCartEntity, (productCart) => productCart.cart)
  products: ProductCartEntity[];

  @Column({ type: 'decimal' })
  valueTotal: number;
}
