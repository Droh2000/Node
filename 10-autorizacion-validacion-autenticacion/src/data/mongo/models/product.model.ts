import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [ true, 'Name is required' ],
        unique: true, // No queremos tener dos productos con el mismo nombre
    },
    available: {
        type: Boolean,
        default: false
    },
    price: {
        type: Number,
        default: 0
    },
    description: {
        type: String,
        // Si no definimos nigun valor por defecto esa propiedad no va a existir en el dcumento que se va a crer en la BD
    },
    // Relacion con el usuario que creo el producto
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // Relacions con la cateogria del producto
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
});

export const productModel = mongoose.model('Product', productSchema);
