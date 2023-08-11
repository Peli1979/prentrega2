import express from "express";
import { cartsController } from "../controllers/carts.controller.js";

export const cartsApiRouter = express.Router();

cartsApiRouter.get("/", cartsController.getAll)
  

cartsApiRouter.get("/:cid", cartsController.get)
  

cartsApiRouter.post("/", cartsController.post)
  

cartsApiRouter.post("/:cid/products/:pid", cartsController.postProductToCart)
 

cartsApiRouter.delete("/:cid/products/:pid", cartsController.deleteProduct)
  

cartsApiRouter.delete("/:cid", cartsController.delete)
 

cartsApiRouter.put("/:cid", cartsController.put)
 

cartsApiRouter.put("/:cid/products/:pid", cartsController.putProductQuantity)
  
