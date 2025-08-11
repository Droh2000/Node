import { Request, Response } from 'express';
import { CustomError, PaginationDto } from '../../domain';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';
import { CategoryService } from '../services/category.service';

export class ProductController {

    constructor(
        // Le pasamos el servicio al controlador
        //todo: private readonly productService: ProductService,
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
    createProduct = (req: Request, res: Response) => {
        // Usamos el Dto para transformar la data que nos mandan en el Body
        /*const [error, createCategoryDto] = CreateCategoryDto.create( req.body );
        if( error ) return res.status(400).json({ error });

        // llamamos el servicio
        this.categoryService.createCategory(createCategoryDto!, req.body.user)
            .then( category => res.status(201).json( category ))
            .catch( error => this.handleError(error, res) );*/
    }

    getProducts = async (req: Request, res: Response) => {

        const { page = 1, limit = 10 } = req.query;
        const [ error, paginationDto ] = PaginationDto.create( +page, +limit );
        if( error ) return res.status(400).json({ error });

        /*this.categoryService.getCategories( paginationDto! )
        .then( categories => res.json( categories ) )
        .catch( error => this.handleError(error, res) )*/
    }
}