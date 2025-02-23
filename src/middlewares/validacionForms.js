import { check, validationResult } from "express-validator";

// Validaciones para Vehículos
export const validarVehiculo = [
    check("marca")
        .isLength({ min: 2, max: 20 })
        .withMessage("La marca debe tener entre 2 y 20 caracteres.")
        .notEmpty()
        .withMessage('El campo "marca" es obligatorio'),

    check("modelo")
        .isLength({ min: 2, max: 20 })
        .withMessage("El modelo debe tener entre 2 y 20 caracteres.")
        .notEmpty()
        .withMessage('El campo "modelo" es obligatorio'),

    check("anio_fabricacion")
        .isInt({ min: 1900, max: new Date().getFullYear() })
        .withMessage("El año de fabricación debe ser un número válido.")
        .notEmpty()
        .withMessage('El campo "anio_fabricacion" es obligatorio'),

    check("placa")
        .matches(/^[A-Z0-9-]+$/i)
        .withMessage("La placa solo debe contener letras, números y guiones.")
        .notEmpty()
        .withMessage('El campo "placa" es obligatorio'),

    check("color")
        .isLength({ min: 3, max: 20 })
        .withMessage("El color debe tener entre 3 y 20 caracteres.")
        .notEmpty()
        .withMessage('El campo "color" es obligatorio'),

    check("tipo_vehiculo")
        .isLength({ min: 3, max: 20 })
        .withMessage("El tipo de vehículo debe tener entre 3 y 20 caracteres.")
        .notEmpty()
        .withMessage('El campo "tipo_vehiculo" es obligatorio'),

    check("kilometraje")
        .isInt({ min: 0 })
        .withMessage("El kilometraje debe ser un número entero positivo.")
        .notEmpty()
        .withMessage('El campo "kilometraje" es obligatorio'),

    check("descripcion")
        .isLength({ min: 5, max: 100 })
        .withMessage("La descripción debe tener entre 5 y 100 caracteres.")
        .notEmpty()
        .withMessage('El campo "descripcion" es obligatorio'),
];

// Validaciones para Usuarios
export const validarUsuario = [
    check("nombre")
        .isLength({ min: 3, max: 30 })
        .withMessage("El nombre debe tener entre 3 y 30 caracteres.")
        .isAlpha("es-ES", { ignore: "áéíóúÁÉÍÓÚñÑ " })
        .withMessage("El nombre solo debe contener letras.")
        .notEmpty()
        .withMessage('El campo "nombre" es obligatorio'),

    check("apellido")
        .isLength({ min: 3, max: 20 })
        .withMessage("El apellido debe tener entre 3 y 20 caracteres.")
        .isAlpha("es-ES", { ignore: "áéíóúÁÉÍÓÚñÑ " })
        .withMessage("El apellido solo debe contener letras.")
        .notEmpty()
        .withMessage('El campo "apellido" es obligatorio'),

    check("email")
        .isEmail()
        .withMessage('El campo "email" no es correcto.')
        .notEmpty()
        .withMessage('El campo "email" es obligatorio'),

    check("password")
        .isLength({ min: 8, max: 20 })
        .withMessage("La contraseña debe tener entre 8 y 20 caracteres.")
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*).*$/)
        .withMessage("Debe contener al menos una mayúscula, una minúscula y un número.")
        .notEmpty()
        .withMessage('El campo "password" es obligatorio'),
];

// Validaciones para Clientes
export const validarCliente = [
    check("cedula")
        .isLength({ min: 10, max: 20 })
        .withMessage("La cédula debe tener entre 10 y 20 caracteres.")
        .notEmpty()
        .withMessage('El campo "cedula" es obligatorio'),

    check("nombre")
        .isLength({ min: 3, max: 20 })
        .withMessage("El nombre debe tener entre 3 y 20 caracteres.")
        .notEmpty()
        .withMessage('El campo "nombre" es obligatorio'),

    check("apellido")
        .isLength({ min: 3, max: 20 })
        .withMessage("El apellido debe tener entre 3 y 20 caracteres.")
        .notEmpty()
        .withMessage('El campo "apellido" es obligatorio'),

    check("ciudad")
        .isLength({ min: 3, max: 10 })
        .withMessage("La ciudad debe tener entre 3 y 10 caracteres.")
        .notEmpty()
        .withMessage('El campo "ciudad" es obligatorio'),

    check("email")
        .isEmail()
        .withMessage('El campo "email" no es correcto.')
        .notEmpty()
        .withMessage('El campo "email" es obligatorio'),

    check("direccion")
        .isLength({ min: 5, max: 30 })
        .withMessage("La dirección debe tener entre 5 y 30 caracteres.")
        .notEmpty()
        .withMessage('El campo "direccion" es obligatorio'),

    check("telefono")
        .isLength({ min: 10, max: 10 })
        .withMessage("El teléfono debe tener exactamente 10 caracteres.")
        .isNumeric()
        .withMessage("El teléfono solo debe contener números.")
        .notEmpty()
        .withMessage('El campo "telefono" es obligatorio'),

    check("fecha_nacimiento")
        .matches(/^\d{4}-\d{2}-\d{2}$/)
        .withMessage("El formato debe ser YYYY-MM-DD.")
        .notEmpty()
        .withMessage('El campo "fecha_nacimiento" es obligatorio'),
];

// Validaciones para Reservas
export const validarReserva = [
    check("codigo")
        .isInt({ min: 0, max: 99999999999 })
        .withMessage("El código debe ser un número de hasta 11 dígitos.")
        .notEmpty()
        .withMessage('El campo "codigo" es obligatorio'),

    check("descripcion")
        .isLength({ min: 5, max: 20 })
        .withMessage("La descripción debe tener entre 5 y 20 caracteres.")
        .notEmpty()
        .withMessage('El campo "descripcion" es obligatorio'),

    check("id_cliente")
        .isMongoId()
        .withMessage("El ID del cliente debe ser un ObjectId válido."),

    check("id_vehiculo")
        .isMongoId()
        .withMessage("El ID del vehículo debe ser un ObjectId válido."),
];

// Middleware para manejar errores
export const manejarErrores = (req, res, next) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        return next();
    } else {
        return res.status(400).json({ errors: errors.array() });
    }
};
