// Factory Function
// Estos se usan si queremos implementar algun tipo de arquitectura en aplicacion de JS
// un factory solo es una funcion que crea otra funcion

// En esta importacion estamos renombrando el paquete para usarlo mejor con un nombre
// const { v4: uuidv4 } = require('uuid');
// const getAge = require('get-age')

// const { getAge } = require('../plugins/get-age.plugin'); // Como nos regresa un objeto tomamos lo que nos interesa desestructurando
// const { getUUID } = require('../plugins/get-id.plugin');
const { getAge, getUUID } = require('../plugins');

// Como ejemplo veamos la construccion de los atributos de una persona

// En la funcion ya recibimos el objeto de arriba pero con las propiedades desestructuradas
const buildPerson = ({ name, birthdate }) => {

    // Regresamos una nueva persona
    return {
        //id: new Date().getTime(), // Sacamos un ID de manera Random con la fecha actual
        id: getUUID(),
        name,
        birthdate,
        // La Edad la calculamos tomando el anio actual y le restamos la fecha que recibimos como argumentos
        // (Aqui ya es propenso a errores porque teniamos que evaluar de que en realidad sea una Fecha, serializable,
        // esto nos dara otro tipo de problemas y no es la forma correcta de determinar la edad de la persona basado en el anio)
        //age: new Date().getFullYear() - new Date(birthdate).getFullYear(),
        age: getAge(birthdate),
    }
    // Esto es una funcion tradicional que regresa un objeto, asi que con un Factory Function vamos a ser capases de tratar de tener dependencias
    // en el codigo, como por ejemplo podriamos crearnos una funcion especifica para determinar correctamente la fecha de nacimiento de la persona
    // Al igual que con el ID donde podriamos usar algun paquqete para generarlo de mejor manera
    // Con esto aplicamos patrones de arquitectura en puro JS sin usar TS

    // Cual es el problema del codigo de arriba
    // Aqui estamos creamos una deuda tecnica porque supongamos que el jefe ahora quiere usar otras librerias o vamos a aplicarle mas cambios
    // y como estas librerias estan altamente acopladas al codigo es problema dificil de resolver porque esto puede que no lo tengamos en un solo archivo
    // sino en miles a travez de todo el proyecto (Buscar en todo el codigo)
    // Como recomendacion cuando vamos a usar un paquete de terceros hay que usar el patron adaptador para hacer que en nuestro codigo sea tolerante a cambios
    // esto es uno de los principios de arquitectura limpia para cuando ya no queramos usar esa libreria, podamos aplicar los cambios rapido
    // aqui es donde las Factory function nos va a ayudar a implementar esto
}

const obj = { name: 'John', birthdate: '2985-25-36' };
const john = buildPerson(obj);