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

// Queda mucho a nuestra discrecion lo que queremos mostrar en la respuesta al hacer la peticion, si queremos seguir el mismo patron, nos creamos una entidad
// con el mapper, aqui gracias a mongoose podemos agregar mas informacion que requiramos como los "TimeStamp"
// pero cuando serializamos el objeto como JSON tenemos la posibilidad de decirle a mongoose como queremos que sea serializado
productSchema.set('toJSON', {
    virtuals: true, // Mostrar el ID del documento
    versionKey: false, // Quitar el __v
    transform: function( doc, ret: any, options ){
        delete ret._id; // Esto es para eliminar el _id
    },
});

export const ProductModel = mongoose.model('Product', productSchema);
