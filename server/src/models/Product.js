// Product model
export default class Product {
  constructor({_id, name, price, description, image}) {
    this.id = _id?.toString() || undefined;
    this.name = name;
    this.price = price;
    this.description = description;
    this.image = image;
  }
}
