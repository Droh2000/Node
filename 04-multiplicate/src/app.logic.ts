const fs = require('fs');

// Vamos a ver como usar Yarg para modificar logica de nuestro codigo usando un script como el que vimos
import { yarg } from "./config/plugins/args.plugin";

// Si queremos probar este codigo, es dificil porque todo nuestro codigo esta muy acoplado, Ademas que vamos a porbar?
// Esto nos servira para entender un concepto en la Arquitectura Limpia que son los casos de uso, por ahora vamos a modificar 
// los resultados vasado en los argumentos que tenemos
/*
  base = Es el numero que se usara para crear la tabla
  limite = Sera del 1 hasta donde definamos los numeros que multiplicamos
  show = Si mandamos este argumento es para mostrar los datos en consola, sino no sale la tabla, solo indicara que el archivo se creo

  Para probar el script lo hacemos con:
    * npx ts-node src/app.logic.ts --base 5 -l 5 -s
*/
// Aqui renombramos las variables en la desestructuracion de JS
const  { b:base, l:limit, s:show} = yarg;

let outputMessage = '';
const headerMessage = `
==================================
        Tabla del ${ base }
==================================\n
`;

for (let i = 1; i <= limit; i++) {
  outputMessage += `${ base } X ${ i } = ${ base * i }\n`
}

outputMessage = headerMessage + outputMessage;

if(show) console.log(outputMessage);

// El contenido lo almacenamos en un archivo de TXT
// La ruta es: outputs/tabla-5.txt

// Tomamos el directorio para decirle al script que si no existe lo cree
const outputPath = "outputs";
fs.mkdirSync(outputPath, {recursive: true});// Recursiva en True por si tenemos varias subcarpetas dentro

fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, outputMessage);
console.log("File Created");