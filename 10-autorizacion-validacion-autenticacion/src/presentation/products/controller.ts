import { Request, Response } from 'express';
import { CreateProductDto, CustomError, PaginationDto } from '../../domain';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';
import { CategoryService } from '../services/category.service';
import { ProductService } from '../services';

export class ProductController {

    constructor(
        // Le pasamos el servicio al controlador
        private readonly productService: ProductService,
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
        const [error, createProductDto] = CreateProductDto.create({ 
            ...req.body,
            // Otra cosa a tener en cuenta es que el usuario ya lo estamos mandando por el token, no lo vamos a mandar como mandamos la catagory
            // para tener el usuario en el body debe de haber pasado por el middleware de autenticacion
            user: req.body.user.id,
        });
        if( error ) return res.status(400).json({ error });

        // llamamos el servicio
        this.productService.createProduct(createProductDto!)
            .then( product => res.status(201).json( product ))
            .catch( error => this.handleError(error, res) );
    }

    getProducts = async (req: Request, res: Response) => {

        const { page = 1, limit = 10 } = req.query;
        const [ error, paginationDto ] = PaginationDto.create( +page, +limit );
        if( error ) return res.status(400).json({ error });

        this.productService.getProducts( paginationDto! )
        .then( products => res.json( products ) )
        .catch( error => this.handleError(error, res) )
    }
}