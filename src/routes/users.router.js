import express from "express";
import { userService } from "../services/users.service.js";
export const usersRouter = express.Router();
import checkLogin from "../utils/checkLogin.js";
import { usersController } from "../controllers/users.controller.js";

usersRouter.get("/", checkLogin, usersController.getUsersRender)
	
