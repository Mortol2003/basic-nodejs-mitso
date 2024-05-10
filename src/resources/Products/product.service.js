import {
  createProduct as createProductTask,
  deleteById as deleteProductById,
  getAll as getProductAll,
  getById as getProductById,
  updateById as updateProductById,
} from './product.memory.repository.js';

const getAll = () => getProductAll();
const getById = (id) => getProductById(id);

const createProduct = ({  
  id,
  name,
  price,
  ageOfIssue,
  lifeTime,
}) => createProductTask({
  id,
  name,
  price,
  ageOfIssue,
  lifeTime,
});

const deleteById = (id) => deleteProductById(id);

const updateById = ({
  id,
  name,
  price,
  ageOfIssue,
  lifeTime,
}) => updateProductById({
  id,
  name,
  price,
  ageOfIssue,
  lifeTime,
});

export {
  createProduct,
  deleteById,
  getAll,
  getById,
  updateById
};

