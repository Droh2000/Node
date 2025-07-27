import mongoose from "mongoose";

// Este esquema son las reglas de como queremos guardar la informacion
const userSchema = new mongoose.Schema({
    // Estos son los datos que queremos del usuario
    name: {
        type: String,
        required: [ true, 'Name is required' ]
    },
    email: {
        type: String,
        required: [ true, 'Email is required' ],
        unique: true, // Para no tener email duplicados
    },
    password: {
        type: String,
        required: [ true, 'Password is required' ]
    },
    // Si queremos la imagen de perfil del usuario y si no especificamos nada mas es un campo opcional
    img: {
        type: String
    },
    role: {
        type: [String], // Como puede tener varios roles por eso lo ponemos como arreglo
        default: ['USER_ROLE'], // Todos los usuarios cuando se creen por defecto seran normales
        enum: ['ADMIN_ROLE', 'USER_ROLE'] // Estos son los roles que puede tener
    }
});

export const UserModel = mongoose.model('User', userSchema);