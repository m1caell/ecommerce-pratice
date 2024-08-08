export class ProductModel {
  id: number;
  name: string;
  url: string;
  value: number;

  constructor(id: number, name: string, value: number, url: string) {
    this.id = id;
    this.name = name;
    this.value = value;
    this.url = url;
  }
}
