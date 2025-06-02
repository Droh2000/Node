const fs = require('fs');

let data = "";

let outputMessage = '';
const base = 5;
const headerMessage = `
==================================
        Tabla del ${ base }
==================================\n
`;

for (let i = 1; i <= 10; i++) {
  outputMessage += `${ base } X ${ i } = ${ base * i }\n`
}

outputMessage = headerMessage + outputMessage;
console.log(outputMessage);

// El contenido lo almacenamos en un archivo de TXT
// La ruta es: outputs/tabla-5.txt

// Tomamos el directorio para decirle al script que si no existe lo cree
const outputPath = "outputs";
fs.mkdirSync(outputPath, {recursive: true});// Recursiva en True por si tenemos varias subcarpetas dentro

fs.writeFileSync(`${outputPath}/tabla-${base}.txt`, data);
console.log("File Created");