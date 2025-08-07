// Aqui es solo la definicion de los endpoints, ya en el archivo Controller es donde esta la logica que implementan
import { Router } from 'express';
import { CategoryController } from './controller';
import { AuthMiddleware } from '../middlewares/auth.middleware';
import { CategoryService } from '../services/category.service';

export class CategoryRoutes {

  static get routes(): Router {

    const router = Router();
    const categoryService = new CategoryService();
    const controller = new CategoryController(categoryService);
    
    // Definir las rutas
    router.get('/', controller.getCategories ); // Obtener las categorias
    // El middleware que creamos lo vamos a poner al nivel del endpoint POST, igual se podria hacer a nivel de todas las rutas
    // el middleware lo podemos mandar como segundo argumento o entre un arreglo por si queremos mandar varios (Asi validamos que esta ruta tenga el JWT)
    router.post('/', [ AuthMiddleware.validateJWT ], controller.createCategory );

    return router;
  }
}