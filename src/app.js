import { fork } from 'child_process';
import MongoStore from 'connect-mongo';
import express from 'express';
import handlebars from 'express-handlebars';
import session from 'express-session';
import passport from 'passport';
import FileStore from 'session-file-store';
import { __dirname } from './config.js';
import { cartsApiRouter } from './routes/carts-api.router.js';
import { cartsRouter } from './routes/carts.router.js';
import { home } from './routes/home.router.js';
import { loginRouter } from './routes/login.router.js';
import { logoutRouter } from './routes/logout.router.js';
import { productsAdminRouter } from './routes/products-admin-router.js';
import { productsApiRouter } from './routes/products-api.router.js';
import { productsRouter } from './routes/products.router.js';
import { registerRouter } from './routes/register.router.js';
import { testChatRouter } from './routes/test-chat.router.js';
import { usersApiRouter } from './routes/users-api.router.js';
import { usersRouter } from './routes/users.router.js';
import { connectMongo } from './utils/connect-db.js';
import { connectSocketServer } from './utils/connect-socket.js';
import { iniPassport } from './utils/passport.js';

import { entorno } from './config.js';

// console.log(entorno);

// CONFIG BASICAS Y CONEXION A BD
const app = express();
// entorno.PORT
const PORT = 8080
const fileStore = FileStore(session);

connectMongo();

// HTTP SERVER
const httpServer = app.listen(PORT, () => {
  console.log(`Levantando en puerto http://localhost:${PORT}`);
});

connectSocketServer(httpServer);
app.use(
  session({
    secret: 'jhasdkjh671246JHDAhjd',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
      mongoUrl: "mongodb+srv://martinrozada:5UEe26MLj7iarOtY@martin-cluster.acwuf3p.mongodb.net/ecommerce?retryWrites=true&w=majority",
      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
      ttl: 100000,
    }),
  })
);
iniPassport();
app.use(passport.initialize());
app.use(passport.session());

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// CONFIG DEL MOTOR DE PLANTILLAS
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

// ENDPOINTS
app.use('/api/products', productsApiRouter);
app.use('/api/carts', cartsApiRouter);
app.use('/api/users', usersApiRouter);
app.use('/api/sessions/login', loginRouter);
app.use('/api/sessions/logout', logoutRouter);
app.use('/api/sessions/register', registerRouter);
app.use('/api/sessions/current', (req, res) => {
  return res.status(200).json({
    status: 'success',
    msg: 'datos de la session',
    payload: req.session.user || {},
  });
});

// PLANTILLAS
app.use('/', home);
app.use('/products', productsRouter);
app.use('/products-admin', productsAdminRouter);
app.use('/users', usersRouter);
app.use('/cart', cartsRouter);
app.use('/test-chat', testChatRouter);

app.get('/cerrate', (req, res) => {
  console.log(process.pid);
  res.send('cerrando todo :(');
  process.exit();
});

function operacionCompleja() {
  let result = 0;
  for (let i = 0; i < 5e9; i++) {
    result += i;
  }
  return result;
}

app.get('/complex', (req, res) => {
  const child = fork('./src/pro2.js');

  child.send('Inicia el proceso!!');

  child.on('message', (result) => {
    res.send('El resultado de la operacion es ' + result);
  });
});

app.get('*', (req, res) => {
  console.log(req.signedCookies);
  return res.status(404).json({
    status: 'Error',
    msg: 'No se ecuentra la ruta especificada',
    data: {},
  });
});
