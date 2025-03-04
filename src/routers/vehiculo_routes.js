import {Router} from 'express'
import { 
    createVehiculoController, 
    getAllVehiculosController, 
    getVehiculosByIDController, 
    updateVehiculoController, 
    deleteVehiculoController 
} from '../controllers/vehiculo_controller.js'

import  verificarAutenticacion  from '../middlewares/auth.js'

import { validarVehiculo, manejarErrores } from '../middlewares/validacionForms.js';

const router = Router()


router.get('/vehiculos',getAllVehiculosController)
router.get('/vehiculos/:id',getVehiculosByIDController)
router.post('/vehiculos',verificarAutenticacion, validarVehiculo, manejarErrores, createVehiculoController)
router.put('/vehiculos',verificarAutenticacion,updateVehiculoController)
router.delete('/vehiculos',verificarAutenticacion,deleteVehiculoController)


export default router