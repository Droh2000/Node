import { Router } from "express";
import { TodosController } from "./todos/controller";
import { TodoRoutes } from "./todos/routes";

export class Approutes{

    static get routes(): Router {
        const router = Router();

        router.use('/api/todos', TodoRoutes.routes);

        return router;
    }
}