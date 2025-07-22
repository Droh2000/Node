import { Request, Response } from "express";
import { prisma } from '../../data/postgres';
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from "../../domain/dtos";

export class TodosController {
    constructor(){}

    public getTodos = async (req: Request, res: Response) => {
        const todos = await prisma.todo.findMany();
        return res.json(todos);
    }

    public getTodosById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        if( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = await prisma.todo.findFirst({
            where: { id } // lo buscamos por el ID que nos mandan
        });

        (todo) ? res.json(todo) : res.status(404).json({ error: `TODO with id ${id} not found` })
    }

    public createTodo = async (req: Request, res: Response) => {
        // En este body pueden venir muchos campos inecesarios y en otros tipos de datos no esperados
        // ademas puede que a futuro requieramos mandar mas propiedades
        // Para esto nos crea un DTO donde tendremos toda la informacion requerida para crear un DTO
        //  const { text } = req.body;
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if( error ) return res.status(400).json({ error });

        //if( !text ) return res.status(400).json({ error: `Text Property is required` });

        // Crear en BD, aqui en "body" tenemos el contenido
        // Despues vamos a ver los DTOs porque sabemos que todo lo que venga en "req.body" de la peticion, todos los campos son de tipo string
        // Como los datos no se reciben con el tipado esperado y ademas tenemos que validarlos
        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        res.json( todo );
    }

    public updateTodo = async (req: Request, res: Response) => {
        // Vamos a crear un DTO que puede recibir el texto y el createdAT de manera opcional para que si lo recibimos hagamos la validacion de la fecha
        // e igualmente con el texto, venga o no venga (El Id lo podemos tambien considerar para mandarlo ya preparado)
        const id = +req.params.id;
        //if( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number' });
        const [ error, updateTodoDto ] = UpdateTodoDto.create({...req.body, id});

        if( error ) return res.status(400).json({ error });

        // Verificamos si existe
        const todo = await prisma.todo.findFirst({
            where: { id }
        });
        if( !todo ) return res.status(404).json({ error: `Todo with id ${ id } not found` });

        //const { text, createdAt } = req.body;
        const updateTodo = await prisma.todo.update({
            where: { id },
            data: /*{ 
                text, 
                // Aqui tenemos que tratar el formato de la fecha (Esta validacion ya la deberiamos de tener validada)
                createdAt: (createdAt) ? new Date(createdAt) : null
            } // Esta es la data que queremos actualizar
             */
            updateTodoDto!.values
        });

        res.json( updateTodo );
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        const todo = await prisma.todo.findFirst({
            where: { id }
        });
        if( !todo ) return res.status(404).json({ error: `Todo with id ${ id } not found` });

        const deleted = await prisma.todo.delete({
            where: { id }
        });

        // por si el usuario vuelve a eliminar el mismo registro ya eliminado
        ( deleted )
            ? res.json( deleted )
            : res.status(400).json({ error: `Todo with id ${ id } not found` });
    }
}
