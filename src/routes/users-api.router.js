import express from "express";
import { userService } from "../services/users.service.js";
import { usersController } from "../controllers/users.controller.js";
import { userUpdateValidator, userValidator } from "../middlewares/main.js";
export const usersApiRouter = express.Router();

usersApiRouter.get("/", usersController.get)
	

usersApiRouter.post("/", userValidator, usersController.post)
	

usersApiRouter.put("/:_id", userUpdateValidator, usersController.put)
		

usersApiRouter.delete("/:_id", usersController.delete)
	
