import { heroes } from "../data/heroes";

// Tipado en Typescript
export const findHeroById = ( id:number ) => {
    return heroes.find( (heroe) => heroe.id === id );
}