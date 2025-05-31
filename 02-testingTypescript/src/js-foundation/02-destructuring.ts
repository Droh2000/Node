


// console.log( process.env );


const { SHELL, HOMEBREW_PREFIX, npm_lifecycle_script } = process.env;


// console.table({ SHELL, HOMEBREW_PREFIX, npm_lifecycle_script });

// Como no habia nada que exportamos, no habia nada que probar entonces exportamos este arreglo como ejemplo
export const characters = ['Flash','Superman', 'Green Lantern', 'Batman'];

const [ , , ,batman ] = characters;

// console.log(batman);