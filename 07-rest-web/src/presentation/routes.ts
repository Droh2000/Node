// Estas son las rutas que maneja la aplicacion

import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodoRoutes } from "./todos/routes";

export class Approutes{

    // A solo que necesitemos hacer inyeccion de dependencias es donde tiene sentido crearnos una instancia de clase
    // pero caso contrario lo podemos hacer con metodos estaticos 
    static get routes(): Router {
        // Este router de express es algo que podemos mandar cuando definamos la ruta como un mddleware (Una funcion que se ejecutara cuando
        // una paeticion pase por aqui)
        const router = Router();

        // Controlador
        //const todoController = new TodosController();

        // Ahora aqui definimos las rutas donde solo mandamos la referencia de la funcion
        // router.get('/api/todos', todoController.getTodos);
        // Aqui solo deveriamos de definir las rutas y cual es el controlador
        // por eso hacemos esta otra implementacion (Se usa "use" porque es un middleware que se ejecutara cuando la ruta pase por aqui) 
        router.use('/api/todos', TodoRoutes.routes);

        return router;
    }
}