import { removeClientById } from '../Orders/orders.memory.repository.js';
import { createClient as createClientInRepo, deleteById as deleteClientById, getAll as getClientAll, getById as getClientById, updateById as updateClientById } from './client.memory.repository.js';

const getAll = () => getClientAll();
const getById = (id) => getClientById(id);
const createClient = ({ name, adress, bonucecard, numberphone }) =>
  createClientInRepo({ name, adress, bonucecard, numberphone });

const deleteById = async (id) => {
  const clientDeletable = await getById(id);
  await deleteClientById(id);
  await removeClientById(id); // Use removeClientById from OrderRepository
  return clientDeletable;
};

const updateById = ({ id, name, adress, bonucecard, numberphone }) =>
  updateClientById({ id, name, adress, bonucecard, numberphone });

export { createClient, deleteById, getAll, getById, updateById };
