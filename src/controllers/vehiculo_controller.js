import Vehiculo from "../models/vehiculos.js";
import mongoose from "mongoose";

const createVehiculoController = async (req, res) => {
    const { placa } = req.body;

    // Verificar si hay campos vacíos
    if (Object.values(req.body).includes("")) {
        return res.status(400).json({ msg: "Lo sentimos, debes llenar todos los campos" });
    }

    try {
        // Verificar si la placa ya está registrada
        const verificarPlacaBDD = await Vehiculo.findOne({ placa });
        if (verificarPlacaBDD) {
            return res.status(400).json({ msg: "Lo sentimos, la placa ya se encuentra registrada" });
        }

        // Crear y guardar el nuevo vehículo
        const nuevoVehiculo = new Vehiculo(req.body);
        await nuevoVehiculo.save();

        res.status(201).json({ msg: "Vehículo registrado exitosamente", vehiculo: nuevoVehiculo });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getAllVehiculosController = async (req, res) => {
    try {
        const vehiculos = await Vehiculo.find();   
        res.status(200).json(vehiculos)
    } catch (error) {
        res.json(error)
    }
}

const getVehiculosByIDController = async (req, res) => {
    const { id } = req.params
    try {
        const vehiculo = await Vehiculo.findById(id);
        const status = vehiculo.error ? 404 : 200
        res.status(status).json(vehiculo)
    } catch (error) {
        res.status(500).json(error)
    }
}

const updateVehiculoController = async (req, res) => {
    const { id } = req.params;

    // Verificar si el ID es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID de vehículo no válido" });
    }

    // Verificar si hay datos para actualizar
    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({ error: "No hay datos para actualizar" });
    }

    try {
        // Buscar y actualizar el vehículo
        const vehiculoActualizado = await Vehiculo.findByIdAndUpdate(id, req.body, { new: true });

        // Verificar si el vehículo existe
        if (!vehiculoActualizado) {
            return res.status(404).json({ error: "Vehículo no encontrado" });
        }

        res.status(200).json({
            message: "Vehículo actualizado correctamente",
            vehiculo: vehiculoActualizado
        });
    } catch (error) {
        console.error("Error al actualizar vehículo:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};

const deleteVehiculoController = async (req, res) => {
    const { id } = req.params;

    // Verificar si el ID es un ObjectId válido
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "ID de vehículo no válido" });
    }

    try {
        // Buscar y eliminar el vehículo
        const vehiculoEliminado = await Vehiculo.findByIdAndDelete(id);

        // Verificar si el vehículo existía
        if (!vehiculoEliminado) {
            return res.status(404).json({ error: "Vehículo no encontrado" });
        }

        res.status(200).json({
            message: "Vehículo eliminado correctamente",
            vehiculo: vehiculoEliminado
        });
    } catch (error) {
        console.error("Error al eliminar vehículo:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


export{
    getAllVehiculosController,
    getVehiculosByIDController,
    createVehiculoController,
    updateVehiculoController,
    deleteVehiculoController
}