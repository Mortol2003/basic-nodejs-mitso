import Order from './orders.model.js';

const Orders = [new Order()];


const getAll = async () => Orders;

const getById = async (id) => Orders.find((order) => order.id === id);

const createOrder = async ({
  id,
  orderNumber, 
  number, 
  clientId, 
  productsId,
}) => {
  const order = new Order({
    id,
    orderNumber, 
    number, 
    clientId, 
    productsId,
  });
  Orders.push(order);
  return order;
};

const deleteById = async (id) => {
  const OrderPosition = Orders.findIndex((order) => order.id === id);

  if (OrderPosition === -1) return null;

  const orderDeletable = Orders[OrderPosition];

  Orders.splice(OrderPosition, 1);
  return orderDeletable;
};

const updateById = async ({
  id,
  orderNumber, 
  number, 
  clientId, 
  productsId,
}) => {
  const OrderPosition = Orders.findIndex((order) => order.id === id);

  if (OrderPosition === -1) return null;

  const oldOrder = Orders[OrderPosition];
  const newOrder = {
    ...oldOrder,
    orderNumber, 
    number, 
    clientId, 
    productsId,
  };

  Orders.splice(OrderPosition, 1, newOrder);
  return newOrder;
};

const removeClientById = async (id) => {
  const clientOrders = Orders.filter((order) => order.clientId === id);

  await Promise.allSettled(
    clientOrders.map(async (order) => updateById({ id: order.id, clientId: null }))
  );
};

const deleteByProductId = async (productsId) => {
  const productOrders = Orders.filter((order) => order.productsId === productsId);

  await Promise.allSettled(productOrders.map(async (order) => deleteById(order.id)));
};

export {
  Orders, createOrder,
  deleteById, deleteByProductId, getAll,
  getById, removeClientById, updateById
};

