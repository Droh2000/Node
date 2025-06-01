import { getPokemonById } from "../../src/js-foundation/06-promises";

describe('js-foundation/06-describe.ts', () => {

    // Evaluamos que el endpoint nos regresa lo que esperamos
    test('getPokemonById should return a pokemon', async() => {
        // Evaluamos especificamente este pokemon
        const pokemonId = 1;
        const pokemonName = await getPokemonById( pokemonId );

        expect( pokemonName ).toBe('bulbasaur');
    }); 

    // Evaluamos un caso que nos debe de dar error
    test('should return an error if pokemon does not exist', async() => {
        const pokemonId = 1000000000000;
        // Esto nos dara error sin importar como lo implementamos porque el error esta ocurriendo en el sujeto de pruebas
        // por eso manejamos el Try/Catch aqui
        try{
            await getPokemonById( pokemonId );
            // Como esto nunca deberia de llegar a pasar pero con esto nos aseguramos que el codigo lanze un error
            // al ponerlo aqui dentro esta linea nos aseguramos que nunca se ejecute esta parte del codigo
            expect( true ).toBe(false);
        }catch(error){
            // Aqui evaluamos el mensaje que nos lanza el Throw desde el sujeto de pruebas
            expect( error ).toBe(`Pokemon not found with id: ${ pokemonId }`);
            // Asi atrapamos una excepcion de una funcion
        }
    });
});