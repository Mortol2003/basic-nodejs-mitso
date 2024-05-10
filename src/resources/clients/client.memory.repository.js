import Client from './client.model.js';

const Clients = [
  new Client({ name: 'CLIENT', adress: 'client', bonucecard: '5@35', numberphone: 'number' }),
];

const getAll = async () => Clients;

const getById = async (id) => Clients.find((client) => client.id === id);

const createClient = async ({ name, adress, bonucecard, numberphone }) => {
  const client = new Client({ name, adress, bonucecard, numberphone });
  Clients.push(client);
  return client;
};

const deleteById = async (id) => {
  const clientPosition = Clients.findIndex((client) => client.id === id);

  if (clientPosition === -1) return null;

  const clientDeletable = Clients[clientPosition];

  Clients.splice(clientPosition, 1);
  return clientDeletable;
};

const updateById = async ({id, name, adress, bonucecard, numberphone }) => {
  const clientPosition = Clients.findIndex((client) => client.id === id);

  if (clientPosition === -1) return null;

  const oldClient = Clients[clientPosition];
  const newClient = { ...oldClient, name, adress, bonucecard, numberphone };

  Clients.splice(clientPosition, 1, newClient);
  return newClient;
};

export {
  Clients, createClient,
  deleteById, getAll,
  getById, updateById
};

