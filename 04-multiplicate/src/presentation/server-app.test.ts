import { CreateTable } from "../domain/use-cases/create-table.use-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";
import { ServerApp } from "./server-app";

describe('Server App', () => {

    const options = {
        base: 2,
        limit: 10,
        showTable: false,
        name: 'test-destination',
        destination: 'test-filename',
    }

    // Entre las ideas que podriamos probar de este archivos
    // Seria por ejemplo el console.log donde podriamos tener ahi un mensaje importante
    // Podriamos llamar el metodo y esperamos todo lo que debe de pasar internamente dentro del sujeto de pruebas
    // (Hay que recordar que cuando mandamos a llamar el metodo RUN de ServerApp vamos a ejecutar el codigo)
    // Como hemos trabajado con casos de uso y tenemos todo basado en argumentos es facil Testear pero vamos a ver otro panorama
    // donde queremos simular y hacer funciones ficticias con Mocks y sobrescribir el "execute" para asegurarnos de poder ejecutarlo 
    // o llamarlo con los argumentos que esperamos pero no ejecutar las instancias de las que depende Como CreateTable o SaveFile, aunque esto
    // dependeria de lo que estemos buscando
    test('should create ServerApp instance', () => {
        const serverApp = new ServerApp();
        expect( serverApp ).toBeInstanceOf(ServerApp);
        // Con esto nos aseguramos que el metodo siempre este ahi y sea estatico
        expect( typeof ServerApp.run ).toBe('function'); // Evaluamos que el metodo de arranque sea una funcion
    });

    // Queremos asegurarnos que cada uno de los pasos hayan sido ejecutamos como esperamos, con el valor esperado y crear Mox sobre los "execute"
    // Porque la parte del "CreateTable" ya se probo antes, es mas util probar que si mandamos a llamar su parte con los argumentos esperados
    // regresemos un valor que sea usado para el siguiente caso de uso y asi solo probar las piezas atomicas del funcionamiento del metodo "run"
    // Primero veamos la prueba para cuando se ejecute la funcion ver que pasa, Hay que fijarse que los Props que espera son todos obligatorios
    test('should run ServerApp with options', () => {
        // Haciendo la prueba asi como esta vamos a tener que ejecutar la todo el programa que puede ser algo que requerimos o no
        // Aqui esperamos que el console (Solo estamos escuchando este log)  
        const logSpy = jest.spyOn(console, 'log');

        // Esto nos va a crear el archivo, ejecutar el servidor y obiamente nosotros no queremos estar creando un monton de basura por ahi
        // Lo ideal es que nuestras pruebas sean flexibles para evitar que tengamos que editar otros archivos u otras cosas
        ServerApp.run(options);

        // Indicamos que se espera que sea llamado 3 veces (Server Running, Show Table, File Created)
        // Si ponemos el argumento de "showTable" en False solo serian 2 veses
        expect( logSpy ).toHaveBeenCalledTimes(2);
        // Tambien podemos inidicar el contenido con el que debe de ser llamado
        expect( logSpy ).toHaveBeenCalledWith('Server running...');
        // Detectar que el ultimo Log sea este en particular
        expect( logSpy ).toHaveBeenLastCalledWith('File created!');

        // Queremos asegurarnos que se haya creado el archivo, pero este caso de uso ya ah sido probado entonces podriamos colocar Spy sobre estos
        // execute entoces si los llamamos con los argumentos esperados que se ejecute como se tiene que ejecutar
        // Con "prototype" obtenemos el ADN de la clase, en este caso obtenemos el metodos del Execute
        const createdTableSpy = jest.spyOn( CreateTable.prototype, 'execute' );
        // Esperamos que el metodo haya sido llamado una vez
        expect( createdTableSpy ).toHaveBeenCalledTimes(1);
        // Con este podemos detarminar con cuales argumentos sea llamado
        expect( createdTableSpy ).toHaveBeenCalledWith({
            base: options.base,
            limit: options.limit,
        });

        // Hacemos lo mismo para la funcion que nos guarda el archivo
        const saveFileSpy = jest.spyOn( SaveFile.prototype, 'execute' );
        expect( saveFileSpy ).toHaveBeenCalledTimes(1);
        expect( saveFileSpy ).toHaveBeenCalledWith({
            // Esta propiedad varia en el contenido por eso
            fileContent: expect.any(String),
            fileDestination: options.destination,
            fileName: options.name,
        });
        // Esta es una prueba de integracion que se esta uniendo con diferentes piezas
    });
});