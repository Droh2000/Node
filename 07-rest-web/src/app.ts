import http from 'http';
import fs from 'fs';

// req -> request es lo que solicita
// res -> es lo que vamos a responder
const server = http.createServer((req, res) => {
    console.log(req.url); // Mostramos lo que el usuario esta pidiendo
    
    // Con el "req.url" sabemos cual pagina es la que el usuario esta solicitando
    // Vamos a decirle al navegador que tipo de informacion es la respuesta
    // especificamos el codigo del estatus, luego la informacion que va a ir en la respuesta
    /*res.writeHead(200, {
        'Content-type': 'text/html'
    });*/
    // Esto seria Server and Rendering porque cuando hacemos la solicitud a la pagina, esto esta creado del lado del servidor
    // y el servidor nos regresa ya el contenido formateado, en la pagina no encontraremos nada de JS
    /*res.write(`<h1>Hola Mundo! URL: ${req.url}</h1>`); // mandaremos un HTML
    res.end();*/

    // Una forma mas corta de hacer lo de arriba
    //  const data = { name: 'John Doe', age: 30, city: 'New York' };
    // Haremos como si fuera un REST server, es decir mandar la informacion en formato JSON para que las personas que manden a llamar el servidor
    // puedan obtener la data en ese formato
    //  res.writeHead(200, { 'Content-type': 'application/json' });
    // Esto es como hacer el Write y luego el End
    //  res.end( JSON.stringify(data) );

    // Si tenemos un sitio web que es mas elavorado con recursos estaticos o mas informacion, entonces no podemos ponerlo todo en el app.ts
    // En la carpeta public tenemos un HTML que queremos mostrar
    if( req.url === '/' ){ // Si estamos en la pagina: localhost:8080
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end( htmlFile );
        // Tendremos un problema si el archivo HTML contiene Css y JS, que al hacer la solicitud no va a encontrar la direccion de esos archivos
        // pero si estan en la request, estan entrando al servidor pero no los estamos sirviendo (Aqui solo servimos al "/")
    }else{
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end();
    }
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