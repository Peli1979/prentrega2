import { connect } from 'mongoose';

export async function connectMongo() {
  try {
    //entorno.MONGO_URL
    await connect("mongodb+srv://martinrozada:5UEe26MLj7iarOtY@martin-cluster.acwuf3p.mongodb.net/ecommerce?retryWrites=true&w=majority");
    console.log('Conectado a la base de datos');
  } catch (e) {
    console.log(e);
    throw 'Falló la conexion';
  }
}
