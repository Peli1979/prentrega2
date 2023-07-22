import express from 'express';
import passport from 'passport';
export const loginRouter = express.Router();

loginRouter.get('/', async (req, res) => {
  try {
    const title = 'Fuego Burgers® - Login';
    return res.status(200).render('login', { title });
  } catch (err) {
    console.log(err);
    res.status(501).send({ status: 'error', msg: 'Error en el servidor', error: err });
  }
});

/* loginRouter.post('/', async (req, res) => {
  const { email, password } = req.body;
  const userExist = await userService.findUser(email, password);
  if (userExist) {
    req.session.user = {
      email: userExist.email,
      firstName: userExist.firstName,
      rol: userExist.rol,
      _id: userExist._id.toString(),
    };
    return res.redirect('/products');
  } else {
    //TODO SERIA BUENO HACER UNA PAGINA DE ERROR PARA ESTE CASO
    return res.send('Usuario Inexistente');
  }
}); */

//TODO FIX ERROR PAGE AGAIN
loginRouter.post('/', passport.authenticate('login', { failureRedirect: '/' }), async (req, res) => {
  if (!req.user) {
    return res.json({ error: 'invalid credentials' });
  }

  console.log(req.user);

  req.session.user = {
    email: req.user.email,
    firstName: req.user.firstName,
    rol: req.user.rol,
    _id: req.user._id.toString(),
  };
  return res.redirect('/products');

  //return res.json({ msg: 'ok', payload: req.user });
});
