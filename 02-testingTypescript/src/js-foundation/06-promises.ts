// Lo cambiamos porque si dejamos el import como abajo que era cuando hicimos el proyecto en JS puro 
// pero ahora estamos en TS y nos da erro en la prueba con la importacion de abajo
import { httpClientPlugin as http } from '../plugins//http-client.plugin';

//const { http } = require('../plugins');

export const getPokemonById = async( id: string|number ):Promise<string> => {
   // Por defecto si falla la funcion que llama el endpoint nos dara una excepcion porque no estamos manejando el error de ninguna manera
  try{
    const url = `https://pokeapi.co/api/v2/pokemon/${ id }`;

    const pokemon = await http.get( url );

    // const resp = await fetch( url );
    // const pokemon = await resp.json();


    // throw new Error('Pokemon no existe');

    return pokemon.name;

    // return fetch( url )
    //   .then( ( resp ) => resp.json())
    //   // .then( () => { throw new Error('Pokemon no existe') })
    //   .then( ( pokemon ) => pokemon.name );
  }catch(error){
    throw `Pokemon not found with id: ${id}`;
  }
}


