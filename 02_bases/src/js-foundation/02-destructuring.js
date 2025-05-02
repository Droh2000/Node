
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
const characters = ['Flash', 'Superman', 'Green latern', 'Batman'];

const [ _, __, batman] = characters;

console.log(batman);

// Depuracion en Node
// Supongamos que agregamos un nuevo personaje y queremos obtener batman pero nos sale otro personaje y no sabemos porque
// entonces ponemos un brakepoint en la linea 25 cuando obtenemos el valor del arreglo desestructurado
// Hay varias formas de hacer la depuracion y poder llegar a este breakpoint
//      Una es ir al Package,json y arriba de "scripts" tenemos las opcion de Debug, despues de darle click nos dara a elegir en nuestros Scripts
//       en este caso seria el de DEV que ejecuta "nodemon src/app.js", al seleccionar esta parte nos mandara al breakpoint, en la parte de la terminal
//       tenemos los botones de Play, saltar a la siguiente linea, saltar a la siguiente funcion, regresar un paso atras, reinicar todo
//       Al poner el cursor encmia de la constante podremos ver todos los valores que almacena, al dar el siguiente paso podemos ver los valores de las variables
//      desestructuradas y asi verificar cual valor es el que estan tomando 
//      * Si cambiamos codigo hay que precionar Reiniciar
//      * Para avanzar al siguiente paso hay que precinar la flecha que esta al lado del rectangulo de Play