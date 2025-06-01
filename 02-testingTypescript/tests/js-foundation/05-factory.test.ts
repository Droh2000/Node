import { buildMakePerson } from '../../src/js-foundation/05-factory';

describe('js-foundation/05-factory.ts', () => {

    // Esto solo definimos como ejemplo lo que esperamos mandarle a la funcion de testing
    const getUUID = () => '1234';
    const getAge = () => 35;

    test('buildMakePerson should return a function', () => {
        // En este caso no nos importa lo que le estamos pasando a la funcion por sus valores del "getAge" y "getUUID"
        // lo importante es que si se va a mandar esa funcion nos regrese esos valores que pasamos no nos interesa probar que estos sean correctos
        const makePerson = buildMakePerson({ getUUID, getAge });

        // esperamos que sea una funcion (Aqui evaluamos que la funcion si este regresando algo, no la logica interna como tal)
        expect(typeof makePerson).toBe('function');
    });

    // Probamos la logica interna de la funcion
    test('makePerson should return a person', () => {
        const makePerson = buildMakePerson({ getUUID, getAge });

        // Creamos la persona como ejemplo que es como deberia de regresarnos la funcion
        const johnDoe = makePerson({ name: 'John Doe', birthdate: '1985-10-21' });
        expect(johnDoe).toEqual({
            id: '12345',
            name: 'John Doe',
            birthdate: '1985-10-21',
            age: 35,
        });
    });
});