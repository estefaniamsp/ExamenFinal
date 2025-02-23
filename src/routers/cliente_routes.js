import {Router} from 'express'
import { 
    getAllClientesController, 
    getClienteByIDController, 
    createClienteController, 
    updateClienteController, 
    deleteClienteController 
} from '../controllers/cliente_controller.js'
import  verificarAutenticacion  from '../middlewares/auth.js'
import { validarCliente, manejarErrores } from '../middlewares/validacionForms.js';

const router = Router()


router.get('/clientes',getAllClientesController)
router.get('/clientes/:id',getClienteByIDController)
router.post('/clientes',verificarAutenticacion, validarCliente, manejarErrores, createClienteController)
router.put('/clientes/:id',verificarAutenticacion,updateClienteController)
router.delete('/clientes/:id',verificarAutenticacion,deleteClienteController)


export default router