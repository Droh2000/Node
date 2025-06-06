// Importamos el sujeto de pruebas
import { CreateTable } from './create-table.use-case';

describe('CreateTableUseCase', () => {
    
    // Hacemos una prueba si no nos mandan nada
    test('should create table with default values', () => {
        
        // Verificamos que si sea una instancia porque puede ser que tengamos alguna funcion que podamos llamar con "new"
        // y eso seria una instancia de una funcion y asi nos aseguramos que sea de nuestra clase
        const createTable = new CreateTable();

        // llamamos a su metodo con los parametros que espera para crear la tabla
        const table = createTable.execute({ base: 2 });
        // Para verificar la cantidad de filas que nos debe de generar
        const rows = table.split('\n').length;

        expect( createTable ).toBeInstanceOf( CreateTable );
        expect( table ).toContain('2 x 1 = 2');
        expect( table ).toContain('2 x 10 = 20');
        expect( rows ).toContain(10);
    });

    test('should create table with custom values', () => {

        const  options = {
            base: 3,
            limit: 20,
        }

        const createTable = new CreateTable();
        const table = createTable.execute(options);

        const rows = table.split('\n').length;
        expect( table ).toContain('3 x 1 = 3');
        expect( table ).toContain('3 x 10 = 30');
        expect( table ).toContain('3 x 20 = 60');
        expect( rows ).toContain( options.limit );
    });
});