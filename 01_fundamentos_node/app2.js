// Queremos leer el archivo Readme que pusimos
// En node ya tenemos paquetes internos para manejar archivos
// Este es el paquete "fs" de Filesystem
const fs = require('fs');

// Este es codigo Bloqueante, le pasamos el archivo y el tipo de Encoding porque si nos regresa el binario
const data = fs.readFileSync('RAEDME.md', 'utf8');

// En "data" tenemos todo el contenido del archivo, queremos remplazar una palabra por otra del texto
// Remplazaremos la palabra de React (En una expreccion regular) por angular
const newData = data.replace(/React/ig, 'Angular');

console.log(data);

// Creamos un nuevo archivo con los nuevos cambios
fs.writeFileSync('README.md', newData);

// Con node podemos modificar y controlar el Filesystem completo