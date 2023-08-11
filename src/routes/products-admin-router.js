import express from "express";
import { productService } from "../services/products.service.js";
export const productsAdminRouter = express.Router();
import checkLogin from "../utils/checkLogin.js";
import { productsController } from "../controllers/products.controller.js";

productsAdminRouter.get("/", checkLogin, productsController.getAdminProducts) 
	