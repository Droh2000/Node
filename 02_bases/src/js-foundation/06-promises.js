// Vamos a hacer una petcion HTTP para traer datos
// En node tenemos al igual que en JS el uso de FetchAPI

// Si ponemos solo el return en la parte de "pokemon.name" nos regresa undefined toda la funcion, esto es porque el valor de retorno esta amarrada al callback donde se implementa
// no a la funcion general que es "getPokemonById", hay varias formas de resolver esto, en este caso ponemos como argumento un Callback
/*const getPokemonById = ( id, callback ) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${ id }`;

    // El fetch es un promesa
    fetch(url).then( ( response ) => {
        // El response contiene un objeto de la respuesta donde tenemos toda la informacion como el status, headers, muchos otros
        // console.log(response);

        // Para obtener los datos llamamos el metodo JSON pero esto es otra promesa
        response.json().then( (pokemon) => {
            //  console.log(pokemon.name);
            //  return pokemon.name; -> Por defecto nos regresa undefined
            callback(pokemon.name);
        });
    });
    // Si no ponemos un return explicito en la funcion, en cada llamada de esta funcion nos estara regresando un undefined
}*/

// Formar limpia de trabajar con Promesas
const getPokemonById = ( id, callback ) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${ id }`;

    fetch(url).then( ( response ) => {
        // Como nos interesa obtener los datos, retornamos este objeto, pero al retornar una promesa dentro de una promesa
        // Esto nos permite poner otro Then en cadena
        return response.json();
    })
    // Aqui podemos acceder con la informacion que nos retornan arriba
    .then( (pokemon) => {
        callback( pokemon.name );
    });
}

// Forma sin trabajar con un Callback
const getPokemonById2 = ( id ) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${ id }`;

    // Regresamos una promesa
    return fetch(url)
        .then( ( response ) => response.json() )
        .then( (pokemon) => pokemon.name ); // De lo que se retorna arriba tomamos estos datos y los retonamos igualmente

    // Que pasa si requerimos procesar algo basado en esa respuesta, en este caso no nos va a ayudar mucho estas promesas en cadena porque
    // tenemos que hacer alguno procedimiento dentro de un callback, esto se resuelve con el Async/await
}

module.exports = {getPokemonById, getPokemonById2};