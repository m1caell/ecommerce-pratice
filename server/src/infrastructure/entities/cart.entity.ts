import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ProductCartEntity } from './product-cart.entity';

@Entity('cart')
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => ProductCartEntity, (product) => product.id)
  products: ProductCartEntity[];

  @Column({ type: 'numeric', precision: 12, scale: 2 })
  valueTotal: number;
}
