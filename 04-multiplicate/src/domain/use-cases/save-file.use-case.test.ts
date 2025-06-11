import { SaveFile } from "./save-file.use-case";
import fs from 'fs';

// El objetivo es probar nuestras piezas o casos de uso de manera aislada
describe('SaveFileUseCase', () => {

    // Estas variables las ponemos aqui para personalizar nuestros tests segun estos valores
    const options = {
        fileContent: 'custom content',
        fileDestination: 'custom-outputs/file-destination',
        fileName: 'custom-table-name',
    }
    // Esta es la ruta que queremos evaluar, con la extencion del archivo
        const filePath = `${options.fileDestination}/${options.fileName}.txt`;
    
    // IMPORTANTE: Al usar el "spyOn" el "mockImplementation" persiste sobre la siguiente prueba (Todas las pruebas se hacen secuencialmente, asi que despues 
    // de esta prueba las demas fallaran) tenemos que limpiar las funciones
    // Esta funcion se ejecuta antes de cada prueba
    /*beforeEach(() => {
        // Esta logica solo funciona para esta implementacion
        const logMock = jest.fn();
        // Pero no para nuestra logica actual
        jest.clearAllMocks();
    });*/
    // Cuando tenemos un mockImplementation manualmente tenemos que hacer la limpieza nosotros

    // Solucion del Falso positivo en el que analizar la carpeta "outputs/Archivo" ya creado de un test anterior
    // para esto en las pruebas hay ciclos de vida para que pase algo, antes,durante, despues de las pruebas
    // Despues de cada prueba vamos a hacer una limpieza 
    afterEach(() => {
        // Verificamos si ya existe
        const outputFolderExists = fs.existsSync('outputs');
        // Borramos de manera recursiva la carpeta de outputs
        if( outputFolderExists ) fs.rmSync('output', { recursive: true });

        const customOutputFolderExists = fs.existsSync(options.fileDestination);
        if( customOutputFolderExists ) fs.rmSync(options.fileDestination, { recursive: true });
    });

    // Probar guardar el archivo con los valores por defecto
    test('should save file with default values', () => {
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
        // Esta variable va a remplazar a la variable "option" de mas arriba (Asi funciona el Scope en JS), esto solo pasa en este archivo
        const options = {
            fileContent: 'test content', // Esta es la porpiedad obligatoria que espera
        }

        // Cuando guardamos los cambios, vamos a ver que nos genera el archivo con el contenido establecido
        // Aqui es donde decidimo (Si eso queremos que pase, eso probamos, si queremos fingir podemos probar unas funciones)
        const result = saveFile.execute(options);
        // Esto puede dar un falso positivo porque si evaluamos y ya teniamos antes el archivo creado, nos dira que tuvo exito
        const fileExists = fs.existsSync(filePath); // Esperamos que cree el archivo en el directorio esperado
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' }); // Verificamos el contenido del archivo

        // Queremos que pase lo que ocurrio por defecto: Que cree la carpeta output, que cree el archivo y el contenido, obiamente lo 
        // que queremos provar es el resultado, no que sean llamados A,B,C,...Pasos, en pocas palabra, llamamos el caso de uso con 
        // sus argumento y evaluamos lo que esperamos que pase
        expect( result ).toBe( true ); // Si es True es que si se pudo crear
        expect( fileExists ).toBe( true );
        expect( fileContent ).toBe( options.fileContent );

    });

    test('should save file with custom values', () => {

        const saveFile = new SaveFile();

        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const fileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });

        expect( result ).toBe( true );
        expect( fileExists ).toBe( true );
        expect( fileContent ).toBe( options.fileContent );
    });
    
    // Podemos probar el escenario donde no se cree el archivo (Evaluamos los posibles fallos, puede que sea una de las dos lineas
    // mkdirSync o writeFileSync) en esos caso entraria al Catch
    // Podemos simular que esto falle (Empezamos con el directorio porque de eso se trata la primera linea de codigo)
    test('should return false if directory could not be created', () => {

        const saveFile = new SaveFile();
        // Podemos crearnos un SPY sobre el "mkdirSync" espiando el FS, solo con el "spyOn" espiamos que la funcion haya sido llamda, los argumentos, pero con el 
        // "mockImplementation" significa que queremos sobrescribir la funcionalidad de la funcion por la logica que le especificamos dentro de los parentesis
        const mkdirSpy = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from testing') } // Cuando se llama la funcion esto es lo que se ejecutara
        );

        // Da igual las opciones con las que le mandemos
        const result = saveFile.execute(options);

        // Esperamos que el resultado falle (En la logica al fallar estamos esperando que nos regresa false)
        expect( result ).toBe( false );

        // Cuando tenemos un "mockImplementation" manualmente tenemos que hacer la limpieza aqui, no dentro de un beforeEach
        // esto nos restaura la funcion sobrescrita a su logica original
        mkdirSpy.mockRestore();
    });

    // Evaluamos la segunda linea de codigo "writeFileSync"
    test('should return false if file could not be created', () => {

        const saveFile = new SaveFile();
        
        const writeFileSpy = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom writing error message from testing') } // Cuando se llama la funcion esto es lo que se ejecutara
        );

        const result = saveFile.execute({ fileContent: 'Hola' });

        expect( result ).toBe( false );
        writeFileSpy.mockRestore();
    });
});