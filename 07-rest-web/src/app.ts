import http2 from 'http2';
import fs from 'fs';

// La implementacion del HTTP2 tenemos que tomar en cuenta que hay navegadores que no soportan cuando no esta encriptado, estamos obligados a usar el 
// createSecureServer (Cuando vayamos a usar el RestFull Api endpoint en aplicaciones de IOS o Android, tienemos que tener SSL sino Apple o Goggle nos rechazaran la app )
// req -> request es lo que solicita
// res -> es lo que vamos a responder
const server = http2.createSecureServer({
    // Tenemos que ganerar un Key y Certificado, esto lo sacamos del Link: https://gist.github.com/Klerith/bc65ca4f398cadd7f292c26a04d62012
    // En Windows tenemos que activar el OpenSSL
    // ese comando lo ejecutamos en la terminal y vamos a llenando los datos que nos pide y al finalizar nos generara los archivos
    key: fs.readFileSync('./keys/server.key'),
    cert: fs.readFileSync('./keys/server.crt'),
    // Despues de esta implementacion podemos ejectuar la pagina como: https://localhost:8080
}, (req, res) => {
    console.log(req.url);
    
    if( req.url === '/' ){
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-type': 'text/html' });
        res.end( htmlFile );
        return;
    }
    
    if( req.url?.endsWith('.js') ){
        res.writeHead(200, { 'Content-type': 'application/javascript' });
    } else if ( req.url?.endsWith('.css') ){
        res.writeHead(200, { 'Content-type': 'text/css' });
    }

    // Esta implementacion nos dara error que el Favicon.ico no existe, asi que implementamos esto para que no se nos crashe toda la pagina y solo de el
    // error en el elemento que no se encontro
    try {
        const responseContent = fs.readFileSync(`./public${ req.url }`, 'utf-8');
        res.end(responseContent);   
    } catch (error) {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end();
    }
});

server.listen(8080, () => {
    console.log('Server running on port 8080');
});