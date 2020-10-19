import { Router } from 'express';
import multer from 'multer';
import uploadConfig from './config/upload';
import RestaurantsController from './controllers/RestaurantsController';

const routes = Router();
const upload = multer(uploadConfig);

routes.get('/restaurants', RestaurantsController.index);
routes.get('/restaurants/:id', RestaurantsController.show);
routes.post('/restaurants', upload.array('images'), RestaurantsController.create);

export default routes;