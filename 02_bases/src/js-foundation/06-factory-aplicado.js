// La idea es que con el uso de esta funcion en todos los lugares donde se implemente automaticamente le mandemos la forma
// en como queremos generar el UUID y la forma en la que vamos a obtener el Get-Age, esto nos va a permitir tener cero dependencias en el archivo
// (En otros patrones de diseno esto seria como la entidad)
//const { getAge, getUUID } = require('../plugins');

// Para no tener que mandarle la dependencia siempre vamos a crear una nueva funcion
// ESto es un FactoryFunction (Es una funcion que regresa una funcion), esto nos va a servir para que podamos mandar las dependencias mediante argumentos
// en este caso ocupamos funciones para ejecutar y obtener los datos de las librerias que estamos usando, asi cuando usemos la funcion interna ya va a estar
// por la funcion externa previamente configurado con lo que se requiere
const buildMakePerson = ({ getUUID, getAge }) => {
    // Aqui regresamos nuestra funcion principal
    // Esta funcion es la que requerimos para crear personas, algunos podrian pensar en mejor usar clases 
    // lo que pasa es que a funciones esta demostrado que son mas rapidas que la instancia de una clase
    return ({ name, birthdate }) => {
        return {
            id: getUUID(),
            name,
            birthdate,
            age: getAge(birthdate),
        }
    }
}

module.exports = {
    buildMakePerson
}

// Veamos creamos una funcion que realiza una tarea en particular sin tener una sola dependencias de terceros
// ahora cualquier cambio lo podemos implementar directamente en los archivos dentro de la carpeta de plugins
// Aplicar el patron adaptar evitamos que nuestro codigo este unido fuertemente con dependencias de terceros
// Asi podemos actualizar dependencias, cambiarlas, y lo podemos hacer rapido en cualquier momento que pase