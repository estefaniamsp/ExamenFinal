import Reserva from "../models/reservas.js";
import Vehiculo from "../models/vehiculos.js";
import mongoose from "mongoose";

const getAllReservasController = async (req, res) => {
    try {
        const reservas = await Reserva.find(); 
        res.status(200).json(reservas)
    } catch (error) {
        res.json(error)
    }
}

const getReservaByIDController = async (req, res) => {
    const { id } = req.params
    try {
        const reserva = await Reserva.findById(id)
        const status = reserva.error ? 404 : 200
        res.status(status).json(reserva)
    } catch (error) {
        res.status(500).json(error)
    }
}

const createReservaController = async(req, res)=> {
    const {codigo,id_cliente,id_vehiculo} = req.body

    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id_cliente) ) return res.status(404).json({msg:`Lo sentimos, no existe el cliente`});
    if( !mongoose.Types.ObjectId.isValid(id_vehiculo) ) return res.status(404).json({msg:`Lo sentimos, no existe el vehiculo`});
    const verificarCodigoBDD = await Reserva.findOne({codigo})
    if(verificarCodigoBDD) return res.status(400).json({msg:"El codigo de la reserva ya esta registrado"})
    const verificarVehiculoBDD = await Reserva.findOne({id_vehiculo,id_cliente})
    if(verificarVehiculoBDD) return res.status(400).json({msg:"El cliente y el vehiculo ya cuentan con una reserva"})
    const nuevaReserva = new Reserva(req.body)
    await nuevaReserva.save()
    res.status(200).json({msg:"Reserva registrada exitosamente", reserva: nuevaReserva})
}

const updateReservaController = async(req, res)=> {
    try {
        const { id, codigo, id_cliente, id_vehiculo } = req.body;

        // Validar que no haya campos vacíos
        if (!id || !codigo || !id_cliente || !id_vehiculo) {
            return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
        }

        // Validar IDs
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ msg: "Lo sentimos, la reserva no existe" });
        }
        if (!mongoose.Types.ObjectId.isValid(id_cliente)) {
            return res.status(404).json({ msg: "Lo sentimos, no existe ese cliente" });
        }
        if (!mongoose.Types.ObjectId.isValid(id_vehiculo)) {
            return res.status(404).json({ msg: "Lo sentimos, no existe este vehículo" });
        }

        // Verificar si el código ya está registrado en otra reserva
        const verificarCodigoBDD = await Reserva.findOne({ codigo });
        if (verificarCodigoBDD && verificarCodigoBDD._id.toString() !== id) {
            return res.status(400).json({ msg: "Lo sentimos, el código de la reserva ya se encuentra registrado" });
        }

        // Crear objeto con los datos actualizados
        const data = { codigo, id_cliente, id_vehiculo };

        // Actualizar la reserva
        const reservaActualizada = await Reserva.findByIdAndUpdate(id, data, { new: true });

        if (!reservaActualizada) {
            return res.status(404).json({ msg: "No se pudo actualizar la reserva, puede que no exista" });
        }

        res.status(200).json({
            msg: `Reserva actualizada con id: ${id}`,
            reserva: reservaActualizada
        });

    } catch (error) {
        console.error("Error al actualizar la reserva:", error);
        res.status(500).json({ msg: "Error en el servidor" });
    }
}

const deleteReservaController = async(req, res)=> {
    const{id} = req.body
    await Reserva.findByIdAndDelete(id);
    res.status(200).json({msg:"La reserva fue eliminada con id:" + id});
}


export{
    getAllReservasController,
    getReservaByIDController,
    createReservaController,
    updateReservaController,
    deleteReservaController
}