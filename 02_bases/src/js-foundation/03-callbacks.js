const users = [
    {
        id: 1,
        name: 'John Doe'
    },
    {
        id: 2,
        name: 'Jane Doe'
    }
];

// Funcion para buscar una persona
// El argumento Callback seria la funcion que le manamos internamente
function getUserById( id, callback ){
    const user = users.find( function(user){
        return user.id === id;
    });
    //console.log({ user });

    // Con el callback verificamos si encontramos el usuario o no lo encontramos
    if( !user ){
        // Ejecutamos la funcion que se encarga de vierifcar eso y hacer las acciones pertientes
        // El argumento que le mandamos es el mensaje del error 
        return callback(`User not found with id = ${id}`);
    }

    // Si existe un usuario
    return callback( null, user);
}

// La idea del callback es que del momento en el que estamos ejecutando la funcion, le mandemos lo que queremos hacer
// cuando tengamos el usuario
module.exports = {
    getUserById
}