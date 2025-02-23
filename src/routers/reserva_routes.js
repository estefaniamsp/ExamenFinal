import {Router} from 'express'
import { 
    getAllReservasController, 
    getReservaByIDController, 
    createReservaController, 
    updateReservaController, 
    deleteReservaController 
} from '../controllers/reserva_controller.js'
import  verificarAutenticacion  from '../middlewares/auth.js'
import { validarReserva, manejarErrores } from '../middlewares/validacionForms.js';

const router = Router()


router.get('/reservas',getAllReservasController)
router.get('/reservas/:id',getReservaByIDController)
router.post('/reservas',verificarAutenticacion, validarReserva, manejarErrores, createReservaController)
router.put('/reservas/:id',verificarAutenticacion,updateReservaController)
router.delete('/reservas/:id',verificarAutenticacion,deleteReservaController)


export default router