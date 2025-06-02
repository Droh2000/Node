// Solo aqui vamos a manejar el paquete de tercero, si el dia de mañana cambiamos de paquete, solo aqui vamos a modificar
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

/*
    Para usar la libreria tenemos de forma Syncrona y Asyncrona
    En este caso sabemos que es Syncrono y por tanto no requerimos 
    de forma asyncrona podemos recibir una promesa y un objeto, de aforma asyncrona podemos verificar el argumento que se esta recibiendo
    para ver si es lo que estamos esperando contra un backend o peticion HTTP o alguna tarea asyncrona
*/
//          export const yarg = yargs(process.argv).parseSync();

// Si le mandamos el "hideBin" nos va a ocultar el Bin Folder, por lo que al ejecutar el comando
// ya no veremos rutas de archivos
export const yarg = yargs(hideBin(process.argv)).parseSync();