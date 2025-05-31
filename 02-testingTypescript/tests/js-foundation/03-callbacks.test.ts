// Exportamos el sujeto de pruebas
import { getUserById } from "../../src/js-foundation/03-callbacks";

// En este caso es un Callback bloqueante porque todo lo que ejecuta es codigo secuencial, si el codigo del Test como arriba
// fuera de una funcion Input/Output no nos funcionaria, despues d ela modificacion que hicimos con el SetTimeout
// Veremos en la ejecucion de la prueba tendremos un mensaje que Fallo en salir de manera repentina y nos indica que a la prueba
// le falta algo para ser buena implementacion
// Podemos verificar que al tener la logica dentro de la funcion de arriba, todo aunque falle nos dira que fue exitoso pero si sacamos
// ese fragmento de codigo de la funcion nos dara el error esperado, esto es por el Scope donde estamos lanzando la logica porque al 
// ponerle el .setTimeout, antes de que se termine de ejecutar la funcion "getUserById" ya termino el Test, ignorando toda la logia que
// habiamos implementado dentro, Asi que le tenemos que decir a que se espere a que la funcion se termine para continuar con la demas logica
// esto se indica en el callback del "test" como el argumento "done"
describe('js-foundation/03-callbacks', () => {
    // Vamos a evaluar que si le mandamos un ID que no existe ingrese a la condicion donde indicamos que no hay usuario
    test('getUserById should return an error if user does not exist', (done) => {
        const id = 10;
        getUserById( id, ( err, user ) => {
            // Evaluamos que el mensaje sea el mismo que especificamos en la funcion
            expect( err ).toBe(`User not found with id ${id}`);
            expect( user ).toBeUndefined();

            // El "donde" lo mandamos a llamar cuando ya sabemos que tenemos los resultados
            done();
        });
         
    });
    
    // Ahora vamos a probar para un caso de existo donde si tenemos un usuario
    test('getUserById should return user by id 1', () => {
        const id = 1;

        getUserById( id, (err, user) => {
            expect( err ).toBeUndefined();
            // Para evaluar objetos no podemos usar el toBe
            expect(user).toEqual({
                id,
                name: 'John Doe',
            });
        });
    });
});


