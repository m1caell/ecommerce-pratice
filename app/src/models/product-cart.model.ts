export class ProductCartModel {
  productCartId: number;
  quantity: number;
  productId: number;
  name: string;
  url: string;
  value: number;

  constructor(
    productCartId: number,
    quantity: number,
    value: number,
    productId: number,
    name: string,
    url: string,
  ) {
    this.productCartId = productCartId;
    this.quantity = quantity;
    this.value = value;
    this.productId = productId;
    this.name = name;
    this.url = url;
  }
}
