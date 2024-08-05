import { Injectable } from '@nestjs/common';
import { CartModel } from 'src/domain/models/cart.model';
import { CartRepository } from 'src/domain/repositories/cart.repository';
import { CartEntity } from '../entities/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCartEntity } from '../entities/product-cart.entity';
import { ProductEntity } from '../entities/product.entity';
import { ProductCartModel } from 'src/domain/models/product-cart.model';
import { ProductModel } from 'src/domain/models/product.model';

@Injectable()
export class CartRepositoryImpl implements CartRepository {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepository: Repository<CartEntity>,

    @InjectRepository(ProductCartEntity)
    private readonly productCartRepository: Repository<ProductCartEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepository: Repository<ProductEntity>,
  ) {}

  async generateNewCart(): Promise<CartModel> {
    const newCart = this.cartRepository.create();
    newCart.valueTotal = 0;

    const cartEntity = await this.cartRepository.save(newCart);

    return new CartModel(cartEntity.id, [], cartEntity.valueTotal);
  }

  async addProductToCart(
    productId: number,
    cartId: number,
    quantity: number,
  ): Promise<ProductCartModel> {
    const cartEntity = await this.cartRepository.findOneBy({ id: cartId });
    const productEntity = await this.productRepository.findOneBy({
      id: productId,
    });

    if (!cartEntity) {
      throw new Error('Cart not found');
    }

    if (!productEntity) {
      throw new Error('Product not found');
    }

    const productCartEntity = this.productCartRepository.create();
    productCartEntity.product = productEntity;
    productCartEntity.cart = cartEntity;
    productCartEntity.quantity = quantity;

    const cartModel = new CartModel(
      cartEntity?.id,
      cartEntity?.products,
      cartEntity?.valueTotal,
    );

    const productModel = new ProductModel(
      productEntity?.id,
      productEntity?.name,
      productEntity?.value,
      productEntity?.url,
    );

    await this.productCartRepository.save(productCartEntity);

    return new ProductCartModel(
      productCartEntity.id,
      cartModel,
      productModel,
      productCartEntity.quantity,
    );
  }

  async removeProductFromCart(
    productId: number,
    cartId: number,
  ): Promise<void> {
    const cartEntity = await this.cartRepository.findOneBy({ id: cartId });
    const productEntity = await this.productRepository.findOneBy({
      id: productId,
    });

    if (!cartEntity) {
      throw new Error('Cart not found');
    }

    if (!productEntity) {
      throw new Error('Product not found');
    }

    const deleteResult = await this.productCartRepository.softDelete({
      id: productId,
    });

    if (deleteResult.affected === 0) {
      throw new Error('Any change happened.');
    }
  }

  async getCart(cartId: number): Promise<CartModel> {
    const cartEntity = await this.cartRepository.findOneByOrFail({
      id: cartId,
    });

    return new CartModel(
      cartEntity.id,
      cartEntity.products,
      cartEntity.valueTotal,
    );
  }
}
