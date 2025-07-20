import express from 'express'; // Para usarlo tenemos que instalar el archivo de definicion de TS

export class Server {

    // Solo vamos a tener Express en muy pocos archivos, y lo ponemos aqui para que no afecta la logica de negocio
    private app = express();

    async start() {
        // Creamos el web server
        // Mostrar todo lo que tenemos en la carpeta publica
        // Usaremos un middleware que son funciones que se ejecutan en todo momento que se pasa por una ruta, ademas colocaremos
        // en su disposicion a los usuarios que lo soliciten, la carpeta public
        this.app.use( express.static( 'public' ) );

        // Ponemos la aplicacion a escuchar peticiones
        this.app.listen(3000, () => {
            console.log(`Server running on port ${ 3000 }`)
        });

        // Con solo esto, ya tenemos todo lo habiamos hecho en los archivos anteriores, solo que ahora estamos en el protocolo HTTP1
        // Deberiamos de recibir las dependencias del Puerto y nombre de carpetas porque pueden cambiar a futuro
    }
}