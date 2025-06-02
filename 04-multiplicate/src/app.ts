//console.log(process.argv);

// Si queremos tomar los argumentos que nos mandan por consola, tendremos que ver que hay logica involucrada solo en esto tan pequeno
// como ver si los argumentos son opcionales que pueden venir o no y si nos vienen lanzar un error
// Aplicando desestructuracion sacar cual fue el comando que se utilizo (En este caso TsNode), app (Seria el archivo que se ejecuto)
// luego tendriamos los argumentos
//      const [ tsnode, app, ...args ] = process.argv;

// Aqui vemos que tenemos los argumentos que nos dieron por consola, lo que pasa es que pueden venir en cualquier orden
// y el usuario mandarloss en el orden como se le de gana 
//      console.log(args);

// Exportamos la libreria que nos ayudara a manejar los argumentos
import { yarg } from "./config/plugins/args.plugin";

// Al ejecutar el comando de: nom run dev ya veremos como automaticamente los argumentos y nos convierte
// el valor a su tipo de dato con su argumento, abajo tenemos el script que se ejecuto
// Como estamos usando el "hideBin" podemos llamar directamente del objeto el argumento
console.log(yarg);
console.log(yarg.b);

/*
  Funcion anonima autoinvocada
    En Node por defecto todo lo que se ejecuta en nuestro archivo app.ts, todo es syncrono, si queremos ejecutar Asyn/Await
    por defecto en el root de la aplicacion no lo podemos hacer:
      await Promise.resolve()
    Esto solo se puede hacer si estamos dentro de una funcion asyncrona
    Pero si tenemos ue trabajar a fuerzas de forma asyncrona se resuelve con una funcion anonima autoinvocada asyncrona

    Esto es un codigo comun cuando requerimos ejecutar cosas asyncronas desde el root de la aplicacion
*/
(async()=>{
  //console.log("Ejecutado");
  await main();
  console.log("Fin del programa")
})();

// Ahora podemos crear funciones y meterlas dentro de la autoinvocada
async function main() {
  console.log("Main Ejecutado");
  // Aqui podriamos llamar cualquier libreria o cosa asyncrona sin problemas
}