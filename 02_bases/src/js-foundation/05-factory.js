// Factory Function
// Estos se usan si queremos implementar algun tipo de arquitectura en aplicacion de JS
// un factory solo es una funcion que crea otra funcion

// Como ejemplo veamos la construccion de los atributos de una persona

// En la funcion ya recibimos el objeto de arriba pero con las propiedades desestructuradas
const buildPerson = ({ name, birthdate }) => {

    // Regresamos una nueva persona
    return {
        id: new Date().getTime(), // Sacamos un ID de manera Random con la fecha actual
        name,
        birthdate,
        // La Edad la calculamos tomando el anio actual y le restamos la fecha que recibimos como argumentos
        // (Aqui ya es propenso a errores porque teniamos que evaluar de que en realidad sea una Fecha, serializable,
        // esto nos dara otro tipo de problemas y no es la forma correcta de determinar la edad de la persona basado en el anio)
        age: new Date().getFullYear() - new Date(birthdate).getFullYear(),
    }
    // Esto es una funcion tradicional que regresa un objeto, asi que con un Factory Function vamos a ser capases de tratar de tener dependencias
    // en el codigo, como por ejemplo podriamos crearnos una funcion especifica para determinar correctamente la fecha de nacimiento de la persona
    // Al igual que con el ID donde podriamos usar algun paquqete para generarlo de mejor manera
    // Con esto aplicamos patrones de arquitectura en puro JS sin usar TS
}

const obj = { name: 'John', birthdate: '2985-25-36' };
const john = buildPerson(obj);