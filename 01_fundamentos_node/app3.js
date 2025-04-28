const fs = require('fs');

const content = fs.readFileSync('RAEDME.md', 'utf8'); // Leemos de forma sincrona y bloqueante porque hasta que no se lee todo podemos continuar

// Queremos saber cuantas palabras contiene (Esto nos regresa un listado de String)
const wordCount = content.split(' ');
console.log(wordCount);

// Saber cuantas veses sale la palabra React

// Esto es una forma
/*const reactWordCount = wordCount.filter(
    //word => word.toLowerCase() === 'react'
    word => word.toLowerCase().includes('react') -> Para encontrar la palabras que no estan separadas por el espacio
).length;*/

// Si no encuentra ninguna coincidencia le ponemos que nos regresa arreglo vacio
const reactWordCount = content.match(/react/ig ?? []).length;

console.log('Palabras', wordCount.length);
console.log('Palabras React:', reactWordCount);
