import express from 'express'; // Para usarlo tenemos que instalar el archivo de definicion de TS
import path from 'path';

export class Server {

    // Solo vamos a tener Express en muy pocos archivos, y lo ponemos aqui para que no afecta la logica de negocio
    private app = express();

    async start() {
        // Creamos el web server
        // Mostrar todo lo que tenemos en la carpeta publica
        // Usaremos un middleware que son funciones que se ejecutan en todo momento que se pasa por una ruta, ademas colocaremos
        // en su disposicion a los usuarios que lo soliciten, la carpeta public
        this.app.use( express.static( 'public' ) );

        // En esta aplicacion de WebServer vamos a usar una aplicacion de React que se creo pero solo son los archivos
        // que se subirian a produccion, el problema que tenemos es su sistema de rutas nuevo, que mientras nos movemos en la aplicacion todo funciona
        // correctamente pero si en cualquier ruta actualizamos la aplicacion, se pierde y nos dice que recurso no encontrado, esto es lo que queremos
        // arreglar en la aplicacion del WebServer (Estos nuevos archivos los metimos a la carpeta Public)
        // Este problema pasa porque no hay ningun directorio en la carpeta publica con el nombre de la ruta "/ruta" (Aqui es donde express nos ayuda)
        // Indicamos que cualquier otra peticion GET que no sea de la carpeta public (Esto es para interceptar todas las request y emitir una response)
        this.app.get('*', (req, res) => {
            // La aplicacion primero entra a "Public", si lo encuentra ahi lo sirve y ahi React toma el control de la aplicacion y hace todo del lado del cliente
            // El problema es cuando se recarga el navegador en una ruta que no es el Root de la aplicacion, entonces cae dentro de este metodo
            // Vamos a retornar el Path al index que tenemos en la carpeta public pero tiene que ser un path absoluto
            // Es "__dirname" porque tiene que ser un path absoluto y son 3 "../../../" porque estamos en server.ts y queremos llegar al root del proyecto
            const indexPath = path.join( __dirname + '../../../public/index.html' );
            res.sendFile(indexPath); // solo podemos llamar esto una vez
            // Con esto podemos recargar en cualquier parte la aplicacion y no falla porque el Router de React tiene el control
        });

        // Ponemos la aplicacion a escuchar peticiones
        this.app.listen(3000, () => {
            console.log(`Server running on port ${ 3000 }`)
        });

        // Con solo esto, ya tenemos todo lo habiamos hecho en los archivos anteriores, solo que ahora estamos en el protocolo HTTP1
        // Deberiamos de recibir las dependencias del Puerto y nombre de carpetas porque pueden cambiar a futuro
    }
}