import { createOrder as createOrderInRepo, deleteById as deleteOrderById, getAll as getOrderAll, getById as getOrderById, updateById as updateOrderById } from './orders.memory.repository.js';

const getAll = () => getOrderAll();
const getById = (id) => getOrderById(id);
const createOrder = ({
  id,
  orderNumber,
  number,
  clientId,
  productsId,
}) => createOrderInRepo({
  id,
  orderNumber,
  number,
  clientId,
  productsId,
});
const deleteById = async (id) => {
  const orderDeletable = await getById(id);
  deleteOrderById(id);
  return orderDeletable;
};
const updateById = ({
  id,
  orderNumber,
  number,
  clientId,
  productsId,
}) => updateOrderById({
  id,
  orderNumber,
  number,
  clientId,
  productsId,
});

export { createOrder, deleteById, getAll, getById, updateById };
