import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

// Este es el adaptador del paquete para encriptar passwords
export const bcryptAdapter = {
    // Con este metodo nos creamos la clave ya con Hash
    hash: (password: string) => {
        const salt = genSaltSync();
        return hashSync( password, salt );
    },
    // Con este metodo comparamos la constraseña
    compare: (password: string, hashed: string) => {
        return compareSync( password, hashed );
    }
}