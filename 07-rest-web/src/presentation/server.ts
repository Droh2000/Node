import express, { Router } from 'express'; // Para usarlo tenemos que instalar el archivo de definicion de TS
import path from 'path';

// Recibimos los datos desde la variable de entorno
interface Options {
    port: number;
    routes: Router; // Para poder asociar el archivo de rutas
    publicPath?: string;
}

export class Server {

    // Solo vamos a tener Express en muy pocos archivos, y lo ponemos aqui para que no afecta la logica de negocio
    private app = express();
    // readonly porque una vez asignado el valor no se les volvera a cambiar
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor(options: Options){
        const { port, routes, publicPath = 'public' } = options;
        this.port = port;
        this.publicPath = publicPath;
        this.routes = routes;
    }

    async start() {
        // Creamos el web server
        // Mostrar todo lo que tenemos en la carpeta publica
        // Usaremos un middleware que son funciones que se ejecutan en todo momento que se pasa por una ruta, ademas colocaremos
        // en su disposicion a los usuarios que lo soliciten, la carpeta public
        this.app.use( express.static( this.publicPath ) );

        // Para tener un REST server debemos de poder regresar un JSON o algo que nos permita hacer un llamado en una peticion 
        //* Definir las Rutas
        // Como app esta como una propiedad de la clase, ponemos "this.app", luego le pasamos la URL que queremos hacer peticion
        /*this.app.get('/api/todos', (req, res) => {
            // Regresamos un par de todos como ejemplo
            res.json([
                { id: 1, text: 'Buy Milk', createdAt: new Date() },
                { id: 2, text: 'Buy Bread', createdAt: null },
                { id: 3, text: 'Buy Butter', createdAt: new Date() },
            ]); // No podemos usar dos veses este metodo de enviar la respuesta
        });*/
        // Si definimos aqui directamente las rutas, esto nos va a crecer mucho en codigo, lo mejor es separar en archivos con responsabilidades propias
        this.app.use( this.routes );

        // Esto hace que cualquier ruta no definida, va a pasar por aqui, esto ayuda a los SPA
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
            const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
            res.sendFile(indexPath); // solo podemos llamar esto una vez
            // Con esto podemos recargar en cualquier parte la aplicacion y no falla porque el Router de React tiene el control
        });

        // Ponemos la aplicacion a escuchar peticiones
        this.app.listen(this.port, () => {
            console.log(`Server running on port ${ this.port }`)
        });

        // Con solo esto, ya tenemos todo lo habiamos hecho en los archivos anteriores, solo que ahora estamos en el protocolo HTTP1
        // Deberiamos de recibir las dependencias del Puerto y nombre de carpetas porque pueden cambiar a futuro
    }
}