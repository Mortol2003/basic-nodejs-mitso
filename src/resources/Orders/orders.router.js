import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchErrors from '../../common/catchErrors.js';
import Order from './orders.model.js';
import { createOrder, deleteById, getAll, getById, updateById } from './orders.service.js';

const router = Router();

router.route('/').get(
  catchErrors(async (req, res) => {
    const orders = await getAll();
    res.json(orders.map(Order.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { productsId } = req.params;
    const { id, orderNumber, number, clientId } = req.body;

    const order = await createOrder({
      id,
      orderNumber,
      number,
      clientId,
      productsId,
    });

    if (order) {
      res.status(StatusCodes.CREATED).json(Order.toResponse(order));
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
    const order = await getById(id);

    if (order) {
      res.json(Order.toResponse(order));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'ORDER_NOT_FOUND', msg: 'Order not found' });
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const { id, productsId } = req.params;
    const { orderNumber, number, clientId } = req.body;

    const order = await updateById({
      id,
      orderNumber,
      number,
      clientId,
      productsId,
    });

    if (order) {
      res.status(StatusCodes.OK).json(Order.toResponse(order));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'ORDER_NOT_FOUND', msg: 'Order not found' });
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const order = await deleteById(id);

    if (order) {
      res
        .status(StatusCodes.NO_CONTENT)
        .json({ code: 'ORDER_DELETED', msg: 'The order has been deleted' });
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'ORDER_NOT_FOUND', msg: 'Order not found' });
    }
  })
);

export default router;
