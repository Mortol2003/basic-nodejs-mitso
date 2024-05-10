import { Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import catchErrors from '../../common/catchErrors.js';
import Client from './client.model.js';
import { createClient, deleteById, getAll, getById, updateById } from './client.service.js';

const router = Router();

router.route('/').get(
  catchErrors(async (req, res) => {
    const clients = await getAll();
    res.json(clients.map(Client.toResponse));
  })
);

router.route('/').post(
  catchErrors(async (req, res) => {
    const { name, adress, bonucecard, numberphone } = req.body;
    const client = await createClient({ name, adress, bonucecard, numberphone });

    if (client) {
      res.status(StatusCodes.CREATED).json(Client.toResponse(client));
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ code: 'CLIENT_NOT_CREATE', msg: 'Client not create' });
    }
  })
);

router.route('/:id').get(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const client = await getById(id);

    if (client) {
      res.json(Client.toResponse(client));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'CLIENT_NOT_FOUND', msg: 'Client not found' });
    }
  })
);

router.route('/:id').put(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const { name, adress, bonucecard, numberphone } = req.body;
    const client = await updateById({ id, name, adress, bonucecard, numberphone });

    if (client) {
      res.status(StatusCodes.OK).json(Client.toResponse(client));
    } else {
      res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'CLIENT_NOT_FOUND', msg: 'Client not found' });
    }
  })
);

router.route('/:id').delete(
  catchErrors(async (req, res) => {
    const { id } = req.params;
    const client = await deleteById(id);

    if (!client) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ code: 'CLIENT_NOT_FOUND', msg: 'Client not found' });
    }

    return res
      .status(StatusCodes.NO_CONTENT)
      .json({ code: 'CLIENT_DELETED', msg: 'The client has been deleted' });
  })
);

export default router;
