// Vamos a hacer una petcion HTTP para traer datos
// En node tenemos al igual que en JS el uso de FetchAPI

// Si ponemos solo el return en la parte de "pokemon.name" nos regresa undefined toda la funcion, esto es porque el valor de retorno esta amarrada al callback donde se implementa
// no a la funcion general que es "getPokemonById", hay varias formas de resolver esto, en este caso ponemos como argumento un Callback
const getPokemonById = ( id, callback ) => {
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

}

module.exports = getPokemonById;