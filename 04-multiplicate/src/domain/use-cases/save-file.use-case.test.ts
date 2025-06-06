import { SaveFile } from "./save-file.use-case";
import fs from 'fs';

// El objetivo es probar nuestras piezas o casos de uso de manera aislada
describe('SaveFileUseCase', () => {

    // Solucion del Falso positivo en el que analizar la carpeta "outputs/Archivo" ya creado de un test anterior
    // para esto en las pruebas hay ciclos de vida para que pase algo, antes,durante, despues de las pruebas
    // Despues de cada prueba vamos a hacer una limpieza 
    afterEach(() => {
        // Borramos de manera recursiva la carpeta de outputs
        fs.rmSync('outputs', { recursive: true, force: true });
    });

    // Probar guardar el archivo con los valores por defecto
    test('should save file with default values', () => {
        const saveFile = new SaveFile();
        const filePath = 'outputs/table.txt';
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

});