import { findHeroById } from "./services/hero.services";

const heroe = findHeroById(2);

// Esto nos da error en Typescript porque la propiedad puede ser nulo
//console.log(heroe.name);

// Si queremos obtener una propiedad en particular, obtendremos un undefined
// console.log(heroe.name);
console.log(heroe?.name ?? 'Hero not found');