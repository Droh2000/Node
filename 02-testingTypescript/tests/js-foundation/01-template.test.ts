// El archivo de test por lo menos debe de tener una prueba, sino al ejecutarlas nos dara error

// Hacemos la importacion del sujeto de prueba (Es el archivo correspondiente del lado de la carpeta SRC)
import { emailTemplate } from "../../src/js-foundation/01-template";

// El metodo "describe" nos sirve para agrupar diferentes metodos de testing
describe('js-foundation/01-template.ts', () => {
    // Este el mensaje que saldra descriptivo cuando se ejecute la prueba
    test('emailTemplate should contain a greeting', () => {
        // Lo que pongamos aqui es lo que la prueba va a ejecutar
        // Vamos a evaluar que el objeto que importamos contenga la palabra "Hi"
        // Si en el futuro alguien modifica este contenido del objeto, nos saltara errores en el Test
        expect( emailTemplate ).toContain('Hi, ');
    });

    // La idea es que evaluemos lo que requerimos que pase, porque podriamos evaluar lo que sea
    // Ahora evaluamos que la propiedad {{name}} se pueda remplazar correctamente al ser consumida en el objeto
    test('emailTemplate should contain {{name}} and {{orderId}}', () => {
        // Una forma de hacerlo es con expreccion regulares
        expect( emailTemplate ).toMatch(/{{name}}/);
        expect( emailTemplate ).toMatch(/{{orderId}}/);
        // Asi nos aseguramos que no haya algun espacion en estas dentro del objeto porque no se podria remplazar la variable en el string

        // Tambien podemos hacer lo mismo de arriba, asi:
        expect( emailTemplate ).toContain('{{name}}');
        expect( emailTemplate ).toContain('{{orderId}}');
    });
    // Si la logica de las pruebas se hace muy grande pensemos en separarla en diferentes archivos que ejecuten diferentes pruebas atomicas llamandolas en un archivo
});