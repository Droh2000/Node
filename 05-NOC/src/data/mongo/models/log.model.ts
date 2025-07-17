import mongoose from "mongoose";

// Aqui mapeamos como vamos a guardar la informacion en Mongo
// Estos datos son los que definimos en "log.entity" dentro de entities
/*
Nos tenemos que crear un modelo para trabajar con estos datos
    level: LogServerityLevel
    message: string
    createdAt?: Date
    origin: string
esto es lo que es importante para nosotros, no lo que esta en la Base de datos porque si el dia de mañana cambia la BD y la
estructura y nuestra aplicacion no deberia de verse afectada
*/

// Estas son las reglas que queremos definir en el objeto
const logSchema = new mongoose.Schema({
    // Aqui definimos los campos
    message: {
        // Definimos mas estrictamente las reglas de los campos
        type: String,
        required: true,
    },
    level: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'low'
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
    origin: {
        type: String,
    },
});

// El Schema lo usamos para crear el modelo y con el modelo es como vamos a interactuar con Mongo
// le pasamos entre comillas el nombre del modelo y el Schema
export const LogModel = mongoose.model('Log', logSchema);
