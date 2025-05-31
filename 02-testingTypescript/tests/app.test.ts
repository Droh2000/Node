// Hacemos esta prueba para ver como ejemplo
// llamamos la funcion "describe" que es de JEST, entre comillas el nombre del archivo que estamos evaluando
describe('App', () => {
    // puede ser "it" (la traduccion seria "esto deberia ser Verdadero") pero cambiamos a "test"
    test('should be true', () => {
        expect(true).toBe(true);
    });
});