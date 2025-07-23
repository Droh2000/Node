import { Router } from "express";
import { TodosController } from "./controller";
import { TodoDatasourceImpl } from "../../infrastructure/datasource/todo.datasource.impl";
import { TodoRepositoryImpl } from "../../infrastructure/repositories/todo.repository.impl";

export class TodoRoutes{

    static get routes(): Router {
        
        const router = Router();

        // Creamos el repositorio para mandarselo al controlador
        const datasource = new TodoDatasourceImpl();// Si queremos cambiar por otro como Mongo, solo cambiamos este Datasource
        const todoRepository = new TodoRepositoryImpl( datasource );

        const todoController = new TodosController(todoRepository);

        router.get('/', todoController.getTodos);
        router.get('/:id', todoController.getTodosById);
        router.post('/', todoController.createTodo);
        router.put('/:id', todoController.updateTodo);
        router.delete('/:id', todoController.deleteTodo);

        return router;
    }
}