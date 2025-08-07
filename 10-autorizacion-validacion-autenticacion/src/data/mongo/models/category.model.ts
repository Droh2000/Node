import mongoose, { Schema } from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Name is required' ],
        unique: true, // No tener dos categorias con el mismo nombre
    },
    available: {
        type: Boolean,
        default: false
    },
    // Agregar la relacion que debe de tener la categoria con el usuario que la creo
    user: {
        type: Schema.Types.ObjectId, // Aqui estamos obligando que el tipo proporcionado debe ser un ID de mongo
        ref: 'User', // Esta referencia es el mismo nombre que especificamos en el "user.mode.ts" (mongoose.model)
        required: true,
    }
});

export const CategoryModel = mongoose.model('Category', categorySchema);
