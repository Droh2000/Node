import { Request, Response } from 'express';
import { CustomError } from '../../domain';

export class CategoryController {

    constructor(){}

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
    createCategory = async (req: Request, res: Response) => {
        res.json('Create Category');
    }

    getCategories = async (req: Request, res: Response) => {
        res.json('Get Categories');
    }
}