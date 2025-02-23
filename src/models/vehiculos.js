import mongoose, { Schema, model } from "mongoose";
const vehiculoSchema = new Schema(
    {
        marca: {
            type: String,
            required: true,
            trim: true,
            maxLenght:20,
        },

        modelo: {
            type: String,
            required: true,
            trim: true,
            maxLenght:20,
        },

        anio_fabricacion: {
            type: String,
            required: true,
            trim: true,
            maxLenght:20,
        },

        placa: {
            type: String,
            required: true,
            trim: true,
            maxLenght:20,
        },

        color: {
            type: String,
            required: true,
            trim: true,
            maxLenght:20,
        },

        tipo_vehiculo: {
            type: String,
            required: true,
            trim: true,
            maxLenght:20,
        },

        kilometraje: {
            type: String,
            required: true,
            trim: true,
            maxLenght:20,
        },

        descripcion: {
            type: String,
            required: true,
            trim: true,
            maxLenght:20,
        }
    },
    {
        timestamps: true,
    }
);
export default model("vehiculos", vehiculoSchema);


