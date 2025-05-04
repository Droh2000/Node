// Patron Adaptador en FetchAPI
// Muchas veses se trabaja con otras librerias para hacer peticiones como Axios porque podemos hacer mas cosas, como poner interceptores, cancelar peticiones, cosas que el Fetch no permite
// El patron adaptador en Fetch se implementa para cuando se nos pida que en todas las peticiones tengan un header de autenticacion, 
// modificar algun token de acceso, modificar cookies o algo por el estilo, es por esto de los cambio del Fetch que tengamos que hacer esto
// (Cuando tengamos la dependencia de algun paquete de terceros siempre adaptemoslo con un codigo nuestro)

// En este caso cuando alguien use nuestra funcion HTTP vamos a recibir el URL y vamos a regresar el producto de la respuesta
const httpClientPlugin = {
    get: async(url) => {
        const resp = await fetch( url );
        return await resp.json(); // Aqui regresamos la data obtenida
    },

    // Este es nuestro patron adaptador que envuelve el fetchAPI, si en el futuro requerimos que todas la peticiones tengan algo, eso lo especificamos aqui
    // porque todas nuestras peticiones van a pasar por aqui
    // Igual podriamos implementar otros metodos
    post: async (url, body) => {},
    put: async (url, body) => {},
    delete: async (url) => {},
}

// Usando Axios
const axios = require('axios');

const httpClientPlugin2 = {
    get: async (url) => {
        const { data } = axios.get(url);
        return data // Axios por defecto nos da en JSON
    },

    post: async (url, body) => {},
    put: async (url, body) => {},
    delete: async (url) => {},
}

// Nosostros puede que tengamos aplicaciones autenticadas con Token de acceso y otras peticiones que son publicas
// podriamos pensar en crearnos dos clientes y por tanto tener duplicado el codigo de arriba pero eso quiebra varios principios 
// de buen codigo y nos es factible para mantener los codigos
// Para resolver esto
// Donde nos creamos una funcion donde recibimos en el header los token de acceso y ahi regresariamos todo nuestro cliente
// el parametro seria opcional
const buildHttpClient = (headers) => {
    return {
        // Aqui en la peticiones insertariamos el header segun si el parametro esta definido o no
    }
}



module.exports = {
    http: httpClientPlugin, // Aqui lo renombramos para ponerle un nombre mas facil
    http2: httpClientPlugin2,
}