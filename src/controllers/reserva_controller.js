import Reserva from "../models/reservas.js";
import Vehiculo from "../models/vehiculos.js";

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
    const verificarCodigoBDD = await Vehiculo.findOne({codigo})
    if(verificarCodigoBDD) return res.status(400).json({msg:"La placa del vehiculo ya se encuentra registrado"})
    const verificarVehiculoBDD = await Vehiculo.findOne({id_vehiculo,id_cliente})
    if(verificarVehiculoBDD) return res.status(400).json({msg:"El cliente ya se encuentra registrado en el vehiculo"})
    const nuevaReserva = new Reserva(req.body)
    await nuevaReserva.save()
    res.status(200).json({msg:"Reserva registrada exitosamente"})
}

const updateReservaController = async(req, res)=> {
    const {codigo,id_cliente,id_vehiculo}= req.body

    if (Object.values(req.body).includes("")) return res.status(400).json({msg:"Lo sentimos, debes llenar todos los campos"})
    if( !mongoose.Types.ObjectId.isValid(id_cliente) ) return res.status(404).json({msg:`Lo sentimos, no existe ese cliente`});
    if( !mongoose.Types.ObjectId.isValid(id_vehiculo) ) return res.status(404).json({msg:`Lo sentimos, no existe esta vehiculo`});
    const verificarCodigoBDD = await Reserva.findOne({codigo})
    if(verificarCodigoBDD && verificarCodigoBDD._id!=_id) return res.status(400).json({msg:"Lo sentimos, el codigo de la reserva ya se encuentra registrado"})
    const reservaActualizada = await Reserva.findByIdAndUpdate(_id, data , { new: true });
    res.status(200).json({msg:"Reserva actualizada con id: "+_id},reservaActualizada);
}

const deleteReservaController = async(req, res)=> {
    const{id} = req.params
    await Rserva.findByIdAndDelete(id);
    res.status(200).json({msg:"La reserva fue eliminada con id:" + id});
}


export{
    getAllReservasController,
    getReservaByIDController,
    createReservaController,
    updateReservaController,
    deleteReservaController
}