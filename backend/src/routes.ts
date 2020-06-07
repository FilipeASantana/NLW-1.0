import express, {response} from 'express';
import {celebrate, Joi} from 'celebrate';

import PointsController from './controllers/PointsController';
import ItemsController from './controllers/ItemsController';

import multer from 'multer';
import multerConfig from './config/multer';
const upload = multer(multerConfig);

const pointsController = new PointsController();
const itemsController = new ItemsController();
const routes = express.Router();

routes.get('/items', itemsController.index);

routes.post(
    '/points',
    upload.single('image'),
    celebrate(
        {
            body: Joi.object().keys({
                name: Joi.string().required(),
                email: Joi.string().required().email(),
                whatsapp: Joi.number().required(),
                latitude: Joi.number().required(),
                longitude: Joi.number().required(),
                city: Joi.string().required(),
                uf: Joi.string().required().max(2),
                items: Joi.string().required(),
            })
        }, {
            abortEarly: false
        }
    ),
    pointsController.create
);

routes.get('/points', pointsController.index);
routes.get('/points/:id', pointsController.show);

export default routes;
