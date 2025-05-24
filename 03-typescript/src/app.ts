const heroes = [
    {
        id: 1,
        name: 'Ironman',
        owner: 'Marvel'
    },
    {
        id: 2,
        name: 'Batman',
        owner: 'DC'
    },
];

// Tipado en Typescript
const findHeroById = ( id:number ) => {
    return heroes.find( (heroe) => heroe.id === id );
}

const heroe = findHeroById(2);

// Esto nos da error en Typescript porque la propiedad puede ser nulo
//console.log(heroe.name);

// Si queremos obtener una propiedad en particular, obtendremos un undefined
// console.log(heroe.name);
console.log(heroe?.name ?? 'Hero not found');