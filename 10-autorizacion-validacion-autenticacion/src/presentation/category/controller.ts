import { Request, Response } from 'express';
import { CustomError } from '../../domain';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';
import { CategoryService } from '../services/category.service';

export class CategoryController {

    constructor(
        // Le pasamos el servicio al controlador
        private readonly categoryService: CategoryService,
    ){}

    // Manejar los errores
    private handleError = (error: unknown, res: Response) => {
        // Verificamos que el error sea una instancia del error personalizado
        if( error instanceof CustomError ){
            return res.status(error.statusCode).json({ error: error.message });
        }

        console.log(`${ error }`)
        return res.status(500).json({ error: 'Internal server error' });
    }

    // Metodos que se llaman en el archivo de rutas
    createCategory = (req: Request, res: Response) => {
        // Usamos el Dto para transformar la data que nos mandan en el Body
        const [error, createCategoryDto] = CreateCategoryDto.create( req.body );
        if( error ) return res.status(400).json({ error });

        // Si nos preguntamos como obtenemos el usuario, este lo pusimos en "req.body.user" entonces de ahi lo leyemos
        // res.json( req.body );

        // llamamos el servicio
        this.categoryService.createCategory(createCategoryDto!, req.body.user)
            // Como buenas practicas de Express es no usar Asyn/Await dentro de los controladores
            .then( category => res.status(201).json( category ))
            .catch( error => this.handleError(error, res) );
    }

    getCategories = async (req: Request, res: Response) => {
        res.json('Get Categories');
    }
}