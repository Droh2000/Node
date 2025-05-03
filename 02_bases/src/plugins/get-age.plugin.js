// Este archivo solo adapta el paquete que le corresponde
const getAgePlugin = require('get-age');

const getAge = (birthdate) => {
    if( !birthdate ) return new Error('birthdate is required');

    // mandamos a llamar el paquete de terceros
    return getAgePlugin(birthdate);
}
// Si el dia de mañana cambiamos de paquete, solo tenemos que cambiar este archivo, no tenemos que cambiar nada mas

// Lo exportamos porque puede que en el futuro queramos ampliar y usar mas funcionalidades
module.exports = {
    getAge
}
// Con esto implementamos el patron adaptador
// Asi facilmente modificamos un unico archivo y no tenemos que ir a cambiar la referencia a todos donde se usa