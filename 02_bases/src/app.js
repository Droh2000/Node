// Este es el punto de entrada de la aplicacion
//console.log("Hola mundo desde Node")

// Para acceder a otros archivos que estan en otras carpetas 
// Como estamos en JS no hace falta que especifiquemos la extencion en el archivo
//          require('./js-foundation/01-template');

// Despues de esto al ejecutar el comando, veremos que se ejecuto todo el archivo
// Cada vez que usemo el "require" las ejecuta por eso normalmente en estos archivos solo crean funciones para registrarlas
// porque si tenemos codigo se va a ejecutar

// Como lo estamos exportando desde el archivo de origen podemos usarlo aqui 
// Y ademas la sintaxis de importacion de modulos ahora podemos desestructurar lo que exportamos.
const { emailTemplate } = require('./js-foundation/01-template'); 

console.log(emailTemplate);

require('./js-foundation/02-destructuring');