import { v4 as uuid } from 'uuid';

class Product {
  constructor({ 
    id = uuid(),
    name = 'cola',
    price = 0,
    ageOfIssue = null,
    lifeTime = null,
  } = {}) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.ageOfIssue = ageOfIssue;
    this.lifeTime = lifeTime;
  }

  static toResponse(product) {
    const { id, name, price, ageOfIssue, lifeTime } = product;
    return { id, name, price, ageOfIssue, lifeTime };
  }
}

export default Product;
