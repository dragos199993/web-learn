import express from 'express';
import basicController from './controllers/basicController';
import userController from './controllers/userController';

const routes = express();

//Basic controller
routes.get('/', basicController.get);

//User controller
routes.post('/signup', userController.post);

export default routes;