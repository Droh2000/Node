// Hacemos esta prueba para ver como ejemplo (A.A.A)
// Todas las palabras reservadas que usamos, ya estan listas sin importar nada porque tenemos el archivos de configuracion de JEST que estan de forma global

// llamamos la funcion "describe" que es de JEST, entre comillas el nombre del archivo que estamos evaluando (Esto se mostrara 
// en la terminal cuando ejecutemos los test)
describe('Test in the App File', () => {
    // puede ser "it" (la traduccion seria "esto deberia ser Verdadero") pero cambiamos a "test", el mensaje tiene que ser de acuerdo al resultado esperado
    test('should be 30', () => {
        // 1. Arrange (Preparamos todo lo que vamos a testear)
        //              normalmente viene de un archivo externo y aqui hacemos la importacion
        // Supongamos que queremos sumar dos numeros
        const num1 = 10;
        const num2 = 20;

        // 2. Act (Aqui es donde probamos lo de arriba)
        const result = num1 + num2;

        // 3. Assert (Evaluamos lo que obtengamos en la parte 2)
        expect(result).toBe(30);
    });
    // Hay varias cosas que pueden suceder en las pruebas, puede que el codigo de la prueba este mal implementado o puede que el codigo de nuestra aplicacion este mal
    // tambien podemos configurar para que solamente si las pruebas pasan, se pueda generar el build de produccion
    // estos son siempre los mismos pasos de las pruebas, lo que cambia es la forma de implementarse
});