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

    await this.productCartRepository.save(productCartEntity);
    await this.cartRepository.update(cartEntity.id, {
      valueTotal:
        Number(cartEntity.valueTotal) + Number(productEntity.value) * quantity,
    });

    return new ProductCartModel(
      productCartEntity.id,
      productEntity,
      productCartEntity.quantity,
    );
  }

  async removeProductFromCart(
    cartId: number,
    productId: number,
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

    const deleteResult = await this.productCartRepository.delete({
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
    const products: ProductCartModel[] = [];

    const productOnCart = await this.productCartRepository.find({
      where: { cart: cartEntity },
    });

    for (const product of productOnCart) {
      const findedProduct = await this.productRepository.findOneByOrFail({
        id: product.id,
      });

      const productModel = new ProductCartModel(
        product.id,
        new ProductModel(
          findedProduct.id,
          findedProduct.name,
          findedProduct.value,
          findedProduct.url,
        ),
        product.quantity,
      );

      products.push(productModel);
    }

    return new CartModel(cartEntity.id, products, cartEntity.valueTotal);
  }
}
