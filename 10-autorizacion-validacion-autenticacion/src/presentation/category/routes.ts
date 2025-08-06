// Aqui es solo la definicion de los endpoints, ya en el archivo Controller es donde esta la logica que implementan
import { Router } from 'express';
import { CategoryController } from './controller';

export class CategoryRoutes {

  static get routes(): Router {

    const router = Router();
    const controller = new CategoryController();
    
    // Definir las rutas
    router.get('/', controller.getCategories ); // Obtener las categorias
    router.post('/', controller.createCategory );

    return router;
  }
}