import { userService } from "../services/users.service.js";


class UsersController{

async get(req, res) {
    try {
		const users = await userService.getAll();
		return res.status(200).json({
			status: "success",
			msg: "listado de usuarios",
			payload: users,
		});
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			status: "error",
			msg: "something went wrong :(",
			payload: {},
		});
	}
};

async post(req, res) {

try {
	const { email, username, password, rol } = req.body;
	
	const userCreated = await userService.create({
		email,
		username,
		password,
		rol,
	});
	return res.status(201).json({
		status: "success",
		msg: "user created",
		payload: {
			_id: userCreated._id,
			email: userCreated.email,
			username: userCreated.username,
			password: userCreated.password,
			rol: userCreated.rol,
		},
	});
} catch (e) {
	console.log(e);
	return res.status(500).json({
		status: "error",
		msg: "something went wrong :(",
		payload: {},
	});
}
};


async put(req, res) {
try {
	const userUptaded = await userService.updateOne({
		_id,
		email,
		username,
		password,
		rol,
	});
	console.log(userUptaded);
	if (userUptaded.matchedCount > 0) {
		return res.status(201).json({
			status: "success",
			msg: "user uptaded",
			payload: {},
		});
	} else {
		return res.status(404).json({
			status: "error",
			msg: "user not found",
			payload: {},
		});
	}
} catch (e) {
	return res.status(500).json({
		status: "error",
		msg: "db server error while updating user",
		payload: {},
	});
}


};

async delete(req, res) {
try {
	const { _id } = req.params;

	const result = await userService.deleteOne(_id);

	if (result?.deletedCount > 0) {
		return res.status(200).json({
			status: "success",
			msg: "user deleted",
			payload: {},
		});
	} else {
		return res.status(404).json({
			status: "error",
			msg: "user not found",
			payload: {},
		});
	}
} catch (e) {
	console.log(e);
	return res.status(500).json({
		status: "error",
		msg: "something went wrong :(",
		payload: {},
	});
}
};

async getUsersRender(req, res) {
try {
	const data = await userService.getAll({});
	const dataParse = data.map((user) => {
		return {
			id: user._id,
			email: user.email,
			username: user.username,
			password: user.password,
			rol: user.rol,
		};
	});
	const title = "Fuego Burgers® - Users";
	return res.status(200).render("users", { dataParse, title });
} catch (err) {
	console.log(err);
	res
		.status(501)
		.send({ status: "error", msg: "Error en el servidor", error: err });
}
}};



export const usersController = new UsersController()



