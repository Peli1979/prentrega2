import express from "express";
import { cartService } from "../services/carts.service.js";
import { cartsController } from "../controllers/carts.controller.js";

export const cartsRouter = express.Router();

cartsRouter.get("/:cid", cartsController.getCartsRender)
  
