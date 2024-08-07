import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProductCartEntity } from './product-cart.entity';

@Entity('product')
export class ProductEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  url: string;

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  value: number;

  @OneToMany(() => ProductCartEntity, (productCart) => productCart.cart)
  productsCart: ProductCartEntity[];
}
