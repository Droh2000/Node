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

    // Las funciones, objetos o cualquier otro elemento va a tener dependencias, como en este caso que dependemos que para obtener la funcion ocupamos
    // la fecha que seria: "new Date().getFullYear()" este "getFullYear" podemos simular de que cuando el codigo lo llamemos en Testing regrese un valor
    // que queramos o decir que nos regrese un valor en particular (Vamos a ver como remplazar un valor)
    test('getAge should return 0 years', () => {
        // Vamos a simular que el "getFullYear" nos va a regresar un año que al restar por la operacion que tenemos nos va a regresar 0, Aqui lo importante no es esta operacion
        // sino ver como podemos sobrescribir este metodo
        // Con esta funcion vamos a estar pendiente del "Date.prototype", esto es porque como nos interesan las fechas (Cada objeto de JS tiene sus Prototypes para acceder a los metodos que tienen)
        // asi es como los "Espiamos" y los podemos subrescribir (Esto lo podemos hacer para cualquier metodo o priedades)
        // Esto es como si cambiaramos el funciona internos del metodo que pongamos entre comillas, con "mockReturnValue" le indicamos el valor que queremos que nos regrese
        const spy = jest.spyOn(Date.prototype, 'getFullYear').mockReturnValue(1995);

        const birthdate = '1995-10-21';
        const age = getAge(birthdate);

        // Aqui es donde estamos mandando a llamar la funcio despues de haber establecido el espia
        // console.log({ age }); -> Esto nos da 0, porque sobrescribirmos la funcion y en "birthdate" pusimo el mismo anio
        expect( age ).toBe(0);

        // Los Mock es una forma de meter datos ficticios, si queremos que estos datos se apliquen a nivel global de todo el testing, ponemos la logica arriba despues del describe, fuera de los "test"
        // Tambien podemos verificar que el SPY haya sido llamado (Seria que la funcion que remplamos haya sido llamada dentro del metodo) 
        //   expect( spy ).toHaveBeenCalled();
    });
});