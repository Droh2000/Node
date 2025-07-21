import { Router } from "express";
import { TodosController } from "./controller";

// Este es el sistema de rutas unicamente relacionado a los Todos
export class TodoRoutes{

    static get routes(): Router {
        
        const router = Router();

        const todoController = new TodosController();

        router.get('/', todoController.getTodos);
        
        return router;
    }
}