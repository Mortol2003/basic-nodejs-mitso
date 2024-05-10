import Product from './product.model.js';

const Products = [new Product()];

const getAll = async () => Products;

const getById = async (id) => Products.find((product) => product.id === id);

const createProduct = async ({
  id,
  name,
  price,
  ageOflssue,
  lifeTime,
}) => {
  const product = new Product({
    id,
    name,
    price,
    ageOflssue,
    lifeTime,
  });
  Products.push(product);
  return product;
};

const deleteById = async (id) => {
  const productPosition = Products.findIndex((product) => product.id === id);

  if (productPosition === -1) return null;

  const productDeletable = Products[productPosition];

  Products.splice(productPosition, 1);
  return productDeletable;
};

const updateById = async ({
  id,
  name,
  price,
  ageOflssue,
  lifeTime,
}) => {
  const productPosition = Products.findIndex((product) => product.id === id);

  if (productPosition === -1) return null;

  const oldProduct = Products[productPosition];
  const newProduct = {
    ...oldProduct,
    name,
    price,
    ageOflssue,
    lifeTime,
  };

  Products.splice(productPosition, 1, newProduct);
  return newProduct;
};

export { Products, createProduct, deleteById, getAll, getById, updateById };
