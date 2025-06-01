import { httpClientPlugin } from "../../src/plugins/http-client.plugin";

describe('plugins/http-client.plugin.ts', () => {

    // Queremos probar que si mandamos el URL vamos a obtener una Data, no vamos a probar Axios
    // vamos a probar el resultado de las funciones y metodos
    test('httpClientPlugin.get() should return a string', async() => {
        // Hacemos una peticion, no importa a que endpoint
        const data = await httpClientPlugin.get('https://jsonplaceholder.typicode.com/todos/1');

        // Esperamos que el objeto sea igual a que esperamos que nos regrese el endpoint
        expect(data).toEqual({
            userId: 1,
            id: 1,
            title: "delectus aut autem",
            //completed: false
            // Si nos interesa solo la propiedad y si es un Booleano, no si es True o False
            completed: expect.any(Boolean) // Esto tambien lo podemos hacer para cualquier otro tipo de dato
        });
    });

    test('httpClientPlugin should have POST, PUT and DELET methods', () => {
        // Evaluemos que cada uno de esos metodos sean funciones, podriamos evaluar si reciben argumentos pero como no los estamos usando
        // no tiene sentido gastar en saber eso (Aqui solo verificamos que tenga esas funciones definidas)
        expect( typeof httpClientPlugin.post ).toBe("function");
        expect( typeof httpClientPlugin.put ).toBe("function");
        expect( typeof httpClientPlugin.delete ).toBe("function");
    });
});