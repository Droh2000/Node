const winston = require('winston');
// Esto lo importamos para poder obtener la fecha de cuando ocurrio el error
const { combine, timestamp, json } = winston.format;

const logger = winston.createLogger({
  level: 'info',
  // Con el Combine podemos combinar todos los formatos que requiramos
  format: combine(
    timestamp(), // La fecha igual la podriamos agregar manualmente en la propiedad "error" del objeto
    json()
  ),
  // Aqui es donde sabemos cual es el archivo que dio error
  // defaultMeta: { service: 'user-service' },
  transports: [
    // Esto nos crea un archivo "error.log" y solo lo va a poner con el nivel del error
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    // Esto es para el caso que queramos combinar todos los logs
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

// Esto es para darle un formato comun de console.log
logger.add(new winston.transports.Console({
    format: winston.format.simple(),
}));

// Vamos a exportar factory function donde queremos recibir cual es el servicio en el cual vamos a usar el logger
// Este es el patron adaptador que esta envolviendo a winston para protegernos a futuro cuando requiramos cambiar a otro paquete
module.exports = function buildLogger(service) {
    // Regresaremos como si fuera un console.log asi que recibimos el mensaje y esto es lo que vamos a mostrar
    return {
        log: (message) => {
            // Estos son los datos que vamos a mostrar, el servicio es con el cual sabremos en que archivo ocurrio el error
            logger.log('info', {message, service});
        },
        // Esto es para crearnos nuestra forma de errores
        // Cuando trabajamos con LOGS algo fundamental es tener registrada la fecha de cuando ocurrio el error
        // los logs nos deben de ayudar a identificar bien cuando y como ocurrieron los errores
        error: (message) => {
            logger.error('info', {message, service});
        },
    }
}