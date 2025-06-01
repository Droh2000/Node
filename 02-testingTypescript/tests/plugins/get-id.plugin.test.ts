// Hay que tener presente que nosotros no vamos a evaluar como funcionan las librerias externas que usemos
// estas ya fueron testeadas por sus creadores, nosotros lo que debemos de hacer es evaluar como se comportan esas
// librerias con nuesta aplicacion
import { getUUID } from "../../src/plugins";

describe('plugins/get-id.plugin.ts', () => {
    // Esperamos que nos regrese un string y que cumpla la cantidad de caracteres que queremos
    test('getUUID() should return a UUID', () => {
        const uuid = getUUID();

        expect( typeof uuid ).toBe('string');
        expect( uuid.length ).toBe(36);
    });
});
