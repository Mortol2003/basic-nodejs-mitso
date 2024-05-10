import { v4 as uuid } from 'uuid';

export default class Order {
  constructor({
    id = uuid(),
    orderNumber = 0,
    number = 0,
    clientId = null,
    productsId = null,
  } = {}) {
    this.id = id;
    this.orderNumber = orderNumber;
    this.number = number;
    this.clientId = clientId;
    this.productsId = productsId;
  }

  static toResponse(order) {
    const { id, orderNumber, number, clientId, productsId } = order;
    return { id, orderNumber, number, clientId, productsId };
  }
}
