import mongoose, { Schema, model } from "mongoose";

const reservaSchema = new Schema(
    {
      codigo: {
          type: Number,
          required: true,
          trim: true,
      },
      descripcion: {
          type: String,
          maxLength: 20,
          trim: true,
          required: true,
      },
      id_cliente: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "clientes",
      },
      id_vehiculo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "vehiculos",
      },
    },
    { timestamps: true }
);
  
export default model("reservas", reservaSchema);
