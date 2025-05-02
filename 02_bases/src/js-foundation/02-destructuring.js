
// El "process" es un proceso de node que esta corriendo en el cual obtenemos mucha informacion de la computadora
// procesos que se estan ejecutandom librerias que se ejecutan, versiones, argumentos 

// Uno de los usos mas tradicionales que tiene es que apuntemos a las variables de ENV
// En la variables de entorno miremos que son un monton, tambien veremos la terminal que se esta utilizando, entre otras cosas
console.log( process.env );

// Uno de los usos comunes de la variable de entorno es que podamos extraer algo en particular segun donde este corriendo node 
// por ejemplo cuando despleguemos la aplicacion en la nube, esta nos va a dar algun puerto
// Por ahora nos regresa undefined porque no hay nigun puerto definido pero cuando sea subido a produccion nos dara un valor,
// entonces basado en eso podemos detectar el ambiento en el que node esta corriendo 
console.log( process.env.PORT ); 

// Desestructuracion de objetos (Aqui tomamos propieades que nos interesan)
const { SHELL, HOMEBREW_PREFIX } = process.env;

// Otra forma mejor de mirar los datos es en formato de tabla
console.table( SHELL, HOMEBREW_PREFIX );

// Desestructuracion de arreglos
// Podemos tomarlos con los nombres que queramos y si no queremos el de alguna posicion solo le ponemos la raya debajo o solo poner una coma dejando vacio ahi
const characters = ['Flash', 'Superman', 'Batman'];

const [ _, __, batman] = characters;

console.log(batman);