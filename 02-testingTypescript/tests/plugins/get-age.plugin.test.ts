// Este es un caso en el que el archivo obtiene la fecha pero si volvemos a ejecutar estas pruebas
// en el futuro la fecha calculada hoy no sera la misma para ese entonces
import { getAge } from "../../src/plugins";

describe('plugins/get-age.plugins.ts', () => {
    
    test('getAge() should return the age of a person', () => {
        // Solo esperamos que si le mandamos este argumento nos regrese lo que esperamos que nos regrese
        const birthdate = '1985-10-21';
        const age = getAge(birthdate);
        // El problema es que cuando pase los anios, esto fallara, y las pruebas se tienen que mantener con los anios
        //expect(age).toBe(30);

        // Mejor evaluamos que el tipo sea numero
        expect( typeof age).toBe('number');
    });

    test('getAge should return surrent age', () => {
        const birthdate = '1985-10-21';
        const age = getAge(birthdate);

        // Tomamos la logica que usa la funcion para hacer sus calculos, asi nos aseguramos que se va a realizar con la misma condicion
        const calculatedAge = new Date().getFullYear() - new Date(birthdate).getFullYear();
        // Verificamos que ambos valores sean iguales
        expect( age ).toBe( calculatedAge );
    });
});