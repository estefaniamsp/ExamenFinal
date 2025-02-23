import Usuario from "../models/usuarios.js";
import generarJWT from "../T_helpers/crearJWT.js";


const registerUser = async(req, res)=> {
    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const verificarEmailBDD = await Usuario.findOne({email})
    if(verificarEmailBDD) return res.status(400).json({msg:"Lo sentimos, el email ya se encuentra registrado"})
    const nuevoUsuario = new Usuario(req.body)
    nuevoUsuario.password = await nuevoUsuario.encrypPassword(password)
    await nuevoUsuario.save()
    delete nuevoUsuario.password
    res.status(200).json({msg:"Registro exitoso ya puedes hacer Login"})
}

const loginUser = async(req, res)=> {

    const {email,password} = req.body
    if (Object.values(req.body).includes("")) return res.status(404).json({msg:"Lo sentimos, debes llenar todos los campos"})
    const UsuarioBDD = await Usuario.findOne({email})
    if(!UsuarioBDD) return res.status(404).json({msg:"Usuario o contraseña incorrectos."})
    const verificarPassword = await UsuarioBDD.matchPassword(password)
    if(!verificarPassword) return res.status(404).json({msg:"Usuario o contraseña incorrectos."})
    const token = generarJWT(UsuarioBDD._id,UsuarioBDD.nombre)

    const {nombre,apellido,_id} = UsuarioBDD
    
    res.status(200).json({
        token,
        nombre,
        apellido,
        email:UsuarioBDD.email,
        _id,
    })
}

export{
    registerUser,
    loginUser
}