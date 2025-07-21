import { Router } from "express";
import { TodosController } from "./controller";

// Este es el sistema de rutas unicamente relacionado a los Todos
export class TodoRoutes{

    static get routes(): Router {
        
        const router = Router();

        const todoController = new TodosController();

        router.get('/', todoController.getTodos);
        // Definimos esta otra ruta para obtener los Todos por ID, hay que saber que cuando obtenemos los argumentos por query parameters 
        // o segmentos de rutas, van a ser siempre string por lo que hay que convertirlo al tipo del ID
        // "/:id" -> esta es una sintaxis especial de express en la cual la ruta puede recibir un argumento llamado id
        router.get('/:id', todoController.getTodosById);
        
        return router;
    }
}