
// Algo a tomar en cuenta es que en el momento en el que estamos haciendo la importacion, el archivo inmediatamente se ejecuta
// Por lo que busca sus argumentos y nos lanzara un error porque nos los encuentra, la idea es preparar nunestro ambiente antes de hacer este tipo de pruebas
// donde le queremos mandar facilmente diferentes valores sin tener que cerrar el testing y volver a arrancar para cada cambio
// Asi evaluamos eplicaciones de consola
const runComand = async( args:string[] ) => {
    // Esparcimos los Argv actuales y le agregamos los nuevos argumentos que estamos recibiendo
    process.argv = [ ...process.argv, ...args ];

    // Aqui importamos nuestro sujeto de pruebas
    // Importamos de forma dinamica este archivo, de donde sacamos nuestro objeto esperado
    const { yarg } = await import('./args.plugin');

    return yarg;
}

describe('Test args.plugin.ts', () => {
    // En algunos caso con el objetivo de que las pruebas sean mas faciles podriamos extraer ciertos objetos
    // Colocando dentro del sujeto de pruebas otra ".option" y dentro especificando los argumentos que nos interesa
    // No tiene nada de malo refactorizar nuestro codigo con el objeto de que las pruebas sean mas faciles

    // Para que la prueba no falle, cada vez que ejecutamos, por la logica de: process.argv = [ ...process.argv, ...args ];
    // estamos esparciendo el Argv anterior con los nuevos, eso se significa que cada vez que se llama el "process.argv" vamos a tener mas argumentos
    // Debemos de asegurarnos que despues de cada prueba hacer una limpieza como estaba anteriormente y que cada Test este en su modo mas limpio
    // porque cada test se ejecuta en secuencia
    const originalArgv = process.argv;  
    beforeEach(() => {
        // Antes de cada prueba va a ser igual a sus valores originales
        process.argv = originalArgv;
        jest.resetModules(); // reseteamos todo a su modo original
    });
    
    // Aqui nos enfocaremos que cuando se mande a llamar ya deberiamos de tener unos datos en particular
    // Si queremos evaluar que vengan las propiedades especificadas: "alias" "type" "demandOption" "describe", nos creariamos un objeto con estas props
    test('should return dedault values', async () => {
        
        // Le mandamos los argumentos esperados de la aplicacion de consola
        // una vez establecemos los nuevos valores en el argV, podemos invocar nuestro archivo de la aplicacion de consola
        // para que se ejecute con estos datos
        // Hay que entender que no vamos a probar que los argumentos esten en pocicion sino que vamos a evaluar el resultado de lo que estamos
        // esperando si usamos este objeto
        const argv = await runComand(['-b', '5']);

        expect(argv).toEqual(
            // Muchas de las opciones que ya tenemos en los argumentos no valen la pena probarlos
            // ya que estas no las estamos usando en otro lugar, si vamos al app.ts solo estamos consumiendo consumiendo las abreviaturas
            // porque el dia de mañana que se quite algo no afectara en otro lugar
            // Con esto le quitamos las propiedades inecesarias (Esperar un objeto que contengan esta informacion minima)
            expect.objectContaining
            ({
                // Solo estas nos interesa porque estas son las que creamos
                b: 5, l: 10, s: false, n: 'multiplication-table', d: 'outputs',
            })
            // En la vida real es raro que evaluaemos muy complejo un comando porque normalmente si no se mandan argumentos, se programa para que muestre la ayuda
        );
    });

    test('should return configuration with custom values', async () => {
        // Aqui le mandamos valores personalizados por nosotros  
        const argv = await runComand(['-b', '5', '-l', '20', '-s', '-n', 'custom-name', '-d', 'custom-dir']);

        // Estos son los valores que esperamos que para exito deberia de ser los mismos 
        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 20,
            s: true,
            n: 'custom-name',
            d: 'custom-dir',
        }));
    })
    
});