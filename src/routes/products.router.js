import express from 'express';
import { productService } from '../services/products.service.js';
export const productsRouter = express.Router();
import checkLogin from '../utils/checkLogin.js';
import { productsController } from '../controllers/products.controller.js';

productsRouter.get('/', checkLogin, productsController.getProductsRender)
  