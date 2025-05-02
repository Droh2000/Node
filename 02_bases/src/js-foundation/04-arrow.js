// Convertimos a funciones de flechas
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

const getUserById = ( id, callback ) => {
    const user = users.find( (user) => user.id === id );

    /*if( !user ){
        return callback(`User not found with id = ${id}`);
    }

    return callback( null, user);*/

    // Lo mismo de arriba con el uso de un ternario
    ( user )
        ? callback( null, user )
        : callback( null, user);
}

module.exports = {
    getUserById
}