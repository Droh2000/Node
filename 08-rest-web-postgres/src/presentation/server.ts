import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    routes: Router;
    publicPath?: string;
}

export class Server {

    private app = express();
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
        //* Middlewares
        this.app.use( express.json() );
        this.app.use( express.urlencoded({ extended: true }) );

        //* Public Folder 
        this.app.use( express.static( this.publicPath ) );

        //* Definir las Rutas (Routes)
        this.app.use( this.routes );

        //* SPA
        this.app.get('*', (req, res) => {
            const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
            res.sendFile(indexPath);
        });

        this.app.listen(this.port, () => {
            console.log(`Server running on port ${ this.port }`)
        });
    }
}