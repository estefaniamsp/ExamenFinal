import {Router} from 'express'
const router = Router()
// Importar los métodos del controlador 
import {
    loginUser,
    registerUser,
} from "../controllers/usuario_controller.js"


import { validarUsuario, manejarErrores } from '../middlewares/validacionForms.js';

// Rutas publicas
router.post("/login", loginUser);
router.post("/registro", validarUsuario, manejarErrores, registerUser);

// Exportar la variable router
export default router  