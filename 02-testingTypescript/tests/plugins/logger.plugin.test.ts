/*
    Lo que tenemos que evaluar es el producto resultante de lo que estamos esperando que funcione
    en este caso estamos esperando que se imprima un log. Hay que probar que se llamen los metodos que esperamos
    porque que haga el trabajo por el cual lo creamos, NO vamos a probar que la libreria que instalamos haga su trabajo interno
*/
import { buildLogger, logger as windstonLogger } from "../../src/plugins";

describe('plugins/logger.plugin.ts', () =>{

    // Comprobamos que nos regrese una funcion
    test('buildLogger should return a function logger', () => {
        //Le especificamos los dos metodos que el logger va a tomar
        const logger = buildLogger('test');

        expect( typeof logger.log ).toBe('function');
        expect( typeof logger.error ).toBe('function');
    });

    // Evaluar que el logger haya sido llamado, hay muchas formas de hacer un mok al respecto
    // no nos interesa hacer un mock completo, solo que haya sido llamado esta funcion
    test('logger.log should log a message', () => {
        // Tomamos el objeto del "logger" y usando el espia para espiar el contenido
        const windstonLoggerMock = jest.spyOn( windstonLogger, 'log' );

        // Construimos lo que espera recibir el logger
        const message = 'test message';
        const service = 'test service';

        const logger = buildLogger(service); // este es el resultado del logger con el espia
        logger.log(message);

        // Esto es lo que vamos a evaluar
        //  expect( windstonLoggerMock ).toHaveBeenCalled(); // Que haya sido llamado una vez
        // Si queremos evaluar con lo que ah sido llamado
        expect( windstonLoggerMock ).toHaveBeenCalledWith(
            'info',
            // Esta es la informacion minima con la que esperamos que sea llamado, y para no estar obligados a poner todo, ya que los demas
            // parametros son inutiles, lo logramos hacer asi
            expect.objectContaining({
                level: 'info',
                message,
                service,
            })
        );

    });
});