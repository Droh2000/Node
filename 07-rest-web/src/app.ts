import http from 'http';

// req -> request es lo que solicita
// res -> es lo que vamos a responder
const server = http.createServer((req, res) => {
    console.log(req.url); // Mostramos lo que el usuario esta pidiendo

    // Esto es lo que vamos a responderle al usuario
    res.write("Hola Mudo");
    res.end();// Cerrar la escritura y terminar la respuesta
});

// Indicamos el puerto por el que esucha
server.listen(8080, () => {
    console.log('Server running on port 8080');
});

// Despues de este codigo, vamos al navegar y ponemos: localhost:8080
// veremos que no nos muestra nada, pero en la terminal veremos que se hizo una peticion a "/"
// si en la URL mandamos algo como: localhost:8080/algo -> Veremos en la terminal la solicitud "/algo"
// Despues del "res.write()" no importa que URL pongamos, nuestro web server siempre responde con ese mensaje
// tambien en la consola veremos que automaticamente nos sale que se solicita el Favicon.ico y luego el ServiceWorker