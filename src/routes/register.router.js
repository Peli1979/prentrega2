import express from 'express';
export const registerRouter = express.Router();
import { userService } from '../services/users.service.js';
import passport from 'passport';

registerRouter.get('/', async (req, res) => {
  try {
    const title = 'Fuego Burgers® - Register';
    return res.status(200).render('register', { title });
  } catch (err) {
    console.log(err);
    res.status(501).send({ status: 'error', msg: 'Error en el servidor', error: err });
  }
});

/* registerRouter.post('/', async (req, res) => {
  const { email, firstName, password, lastName, age } = req.body;

  const userExist = await userService.findUserByEmail(email);
  if (userExist) {
    return res.status(400).send('El usuario ya existe!');
  } else {
    try {
      const userCreated = await userService.create({ email, firstName, password, lastName, age, rol: 'user' });

      req.session.user = {
        email: userCreated.email,
        firstName: userCreated.firstName,
        rol: userCreated.rol,
        _id: userCreated._id.toString(),
      };
    } catch (e) {
      return res.status(500).send('Problema al crear un usuario.');
    }
    return res.redirect('/');
  }
});
 */

//TODO PONER UNA BUENA RUTA DE ERROR
registerRouter.post('/', passport.authenticate('register', { failureRedirect: '/' }), (req, res) => {
  if (!req.user) {
    return res.json({ error: 'something went wrong' });
  }
  req.session.user = {
    email: req.user.email,
    firstName: req.user.firstName,
    rol: req.user.rol,
    _id: req.user._id.toString(),
  };

  return res.redirect('/');
});
