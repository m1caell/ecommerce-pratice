import { Injectable } from '@nestjs/common';
import { CartModel } from 'src/domain/models/cart.model';
import { CartRepository } from 'src/domain/repositories/cart.repository';
import { CartEntity } from '../entities/cart.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductCartEntity } from '../entities/product-cart.entity';
import { ProductEntity } from '../entities/product.entity';
import { ProductCartModel } from 'src/domain/models/product-cart.model';

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
  ): Promise<CartModel> {
    const cartEntity = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: { products: true },
    });

    if (!cartEntity) {
      throw new Error('Cart not found');
    }

    const productEntity = await this.productRepository.findOneBy({
      id: productId,
    });

    if (!productEntity) {
      throw new Error('Product not found');
    }

    const newProductCart = this.productCartRepository.create();
    newProductCart.product = productEntity;
    newProductCart.cart = cartEntity;
    newProductCart.quantity = quantity;

    const product = await this.productCartRepository.save(newProductCart);

    cartEntity.products.push(product);

    cartEntity.valueTotal =
      Number(cartEntity.valueTotal) + Number(productEntity.value) * quantity;

    const cartSaved = await this.cartRepository.save(cartEntity);

    const productsModel: ProductCartModel[] =
      await this.getFilledProductsCardModel(cartEntity.products);

    return new CartModel(cartSaved.id, productsModel, cartSaved.valueTotal);
  }

  async removeProductFromCart(
    cartId: number,
    productCartId: number,
  ): Promise<CartModel> {
    const cartEntity = await this.cartRepository.findOne({
      where: { id: cartId },
      relations: { products: true },
    });
    const productCartEntity = await this.productCartRepository.findOne({
      where: { id: productCartId },
      relations: { product: true },
    });

    if (!cartEntity) {
      throw new Error('Cart not found');
    }

    if (!productCartEntity) {
      throw new Error('Product not found');
    }

    cartEntity.valueTotal =
      Number(cartEntity.valueTotal) -
      Number(productCartEntity.product.value) * productCartEntity.quantity;

    const deleteResult = await this.productCartRepository.delete({
      id: productCartId,
    });

    if (deleteResult.affected === 0) {
      throw new Error('Any change happened.');
    }

    const cartUpdated = await this.cartRepository.save(cartEntity);
    const productsDto = await this.getFilledProductsCardModel(
      cartEntity.products,
    );

    return new CartModel(cartUpdated.id, productsDto, cartUpdated.valueTotal);
  }

  async getCart(cartId: number): Promise<CartModel | null> {
    const cartEntity = await this.cartRepository.findOne({
      relations: { products: true },
      where: { id: cartId },
    });

    if (!cartEntity) {
      return null;
    }

    const productsDto = await this.getFilledProductsCardModel(
      cartEntity.products,
    );

    return new CartModel(cartEntity?.id, productsDto, cartEntity?.valueTotal);
  }

  async getFilledProductsCardModel(products: ProductCartEntity[]) {
    const productsModel: ProductCartModel[] = [];

    for await (const productCart of products) {
      const productEntity = await this.productRepository.findOneOrFail({
        where: { id: productCart.productId },
      });

      productsModel.push(
        new ProductCartModel(
          productCart.id,
          productCart.quantity,
          productEntity?.value,
          productEntity?.id,
          productEntity?.name,
          productEntity?.url,
        ),
      );
    }

    return productsModel;
  }
}
