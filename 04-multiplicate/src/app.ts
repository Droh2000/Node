console.log(process.argv);

// Si queremos tomar los argumentos que nos mandan por consola, tendremos que ver que hay logica involucrada solo en esto tan pequeno
// como ver si los argumentos son opcionales que pueden venir o no y si nos vienen lanzar un error
// Aplicando desestructuracion sacar cual fue el comando que se utilizo (En este caso TsNode), app (Seria el archivo que se ejecuto)
// luego tendriamos los argumentos
const [ tsnode, app, ...args ] = process.argv;

// Aqui vemos que tenemos los argumentos que nos dieron por consola, lo que pasa es que pueden venir en cualquier orden
// y el usuario mandarloss en el orden como se le de gana 
console.log(args);