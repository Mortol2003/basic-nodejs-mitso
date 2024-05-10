import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchErrors from '../../common/catchErrors.js';
import Product from './product.model.js';
import { createProduct, deleteById, getAll, getById, updateById } from './product.service.js';

const router = Router({ mergeParams: true });

router.route('/').get(
  catchErrors(async (req, res) => {
    const products = await getAll();
    res.json(products.map(Product.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { id, name, price, ageOflssue, lifeTime } = req.body;
    const product = await createProduct({
      id,
      name,
      price,
      ageOflssue,
      lifeTime,
    });
    if (product) {
      res.status(StatusCodes.CREATED).json(Product.toResponse(product));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'BAD_REQUEST', msg: 'Bad request' });
    }
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const product = await getById(id);
    if (product) {
      res.json(Product.toResponse(product));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'PRODUCT_NOT_FOUND', msg: 'Product not found' });
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const { name, price, ageOflssue, lifeTime } = req.body;
    const product = await updateById({
      id,
      name,
      price,
      ageOflssue,
      lifeTime,
    });
    if (product) {
      res.status(StatusCodes.OK).json(Product.toResponse(product));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'PRODUCT_NOT_FOUND', msg: 'Product not found' });
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const product = await deleteById(id);
    if (product) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ code: 'PRODUCT_DELETED', msg: 'The product has been deleted' });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'PRODUCT_NOT_FOUND', msg: 'Product not found' });
    }
  })
);

export default router;
