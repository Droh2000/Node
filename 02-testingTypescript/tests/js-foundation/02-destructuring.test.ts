// Importamos el sujeto de prueba
import { characters } from "../../src/js-foundation/02-destructuring";

describe('js-foundation/02-destructuring.ts', () => {
    test('characters should contains Flash, Superman', () => {
        // Queremos asegurarnos que el arreglo contenga estos personajes, si el orden fuera importante, podriamos desestructurar el objeto
        // y en base a esas variables comparar que sea el esperado, en este caso el orden no nos importa (Tener en cuenta que este "Contain"
        // es CaseSensitive)
        expect( characters ).toContain('Flash');
        expect( characters ).toContain('Superman');
    });

    // En este si nos importa el orden de contenido del arreglo
    test('First character should be Flash and secuond Superman', () => {
        const [ flash, superman ] = characters;

        /*
            Podriamos estar tentado a hacer Console.log(), si lo ponemos aqui al ejecutar la prueba se nos mostrar el contenido
            el problema esta cuando tenemos Console.log dentro del sujeto de prueba, si esta en una funcion o en una parte que se esta llamando
            varias veses tendremos mucha informacion en consola y mas si tenemos Console.log dentro del archivo de Test no sabremos de donde viene
            la informacion
            Lo mejor es usar Breackpoints, En la paleta de Comando ponemos: NPM Scripts
            y seleccionamos la opcion de Test:Watch y esto va a empezar a ejecutar las pruebas en el VS Code
            donde veremos la debugacion el contenido que tiene cada uno de los elementos 
        */
        expect( flash ).toBe('Flash');
        expect( superman ).toBe('Superman');
    });
    
});