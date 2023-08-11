import express from "express";
import { productsController } from "../controllers/products.controller.js";
import { productUpdateValidator, productValidator } from "../middlewares/main.js";
export const productsApiRouter = express.Router();

productsApiRouter.get("/", productsController.get);
 

productsApiRouter.post("/", productValidator, productsController.post) 
 

productsApiRouter.put("/:_id", productUpdateValidator, productsController.put) 
 
   

productsApiRouter.delete("/:_id",productsController.delete) 
 

