 interface Hero {
    id: number,
    name: string,
    owner: string,
 }

// Ahora podemos exportar asi
export const heroes: Hero[] = [
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