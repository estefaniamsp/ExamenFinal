import express from 'express'
import morgan from 'morgan'

import cors from 'cors';
import dotenv from 'dotenv';

import routerVehiculo from './routers/vehiculo_routes.js'
import routerUsuario from './routers/usuario_routes.js'
import routerCliente from './routers/cliente_routes.js'
import routerReserva from './routers/reserva_routes.js'

// Configuración específica para desarrollo utilizando dotenv
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const app = express()
app.use(morgan('dev'))


// Variables
app.set('port',process.env.PORT || 3000)
app.use(cors())

// Middlewares 
app.use(express.json())

app.use('/api',routerVehiculo)
app.use('/api',routerUsuario)
app.use('/api',routerCliente)
app.use('/api',routerReserva)

// Rutas 
app.use((req,res)=>res.status(404).send("Endpoint no encontrado - 404"))

// Exportar la instancia de express por medio de app
export default  app