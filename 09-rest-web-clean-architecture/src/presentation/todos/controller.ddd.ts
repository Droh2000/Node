import { Request, Response } from "express";
import { prisma } from '../../data/postgres';
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosController {
    // En el controlador estabamos llegando a la base de datos con Prisma, no esta mal y muchos lo dejan asi
    // aunque tambien nos podemos crear un servicio que es un proveedor de informacion el cual se lo inyectamos al controlador
    // y en el servicio hariamos todas las interacciones o implementaciones de la base de datos con el objeto de centralizar
    // Vamos a usar el Repositorio que ya habiamos creado
    constructor(
        private readonly todoRepository: TodoRepository, // No estamos mandando la implementacion sino cualquiera que este definido ahi
    ){}

    public getTodos = async (req: Request, res: Response) => {
        // Implementamos la logica usando el repository (Mas adelante usaremos los Casos de uso tambien)
        const todos = await this.todoRepository.getAll(); // Aqui tenemos la instancia de Todos
        return res.json(todos)// El "todos" son instancias del TodoEntity, no son objetos como los regresa prisma
    }

    public getTodosById = async (req: Request, res: Response) => {
        const id = +req.params.id;
        
        try {
            // Esto podria fallar (podriamos evaluar cual es el valor que se regresa o disparar errores personalizados, 
            // esto lo hariamos con los casos de uso)
            const todo = await this.todoRepository.findById(id);
            res.json(todo);
        } catch (error) {
            res.status(400).json({error});
        }
    }

    public createTodo = async (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if( error ) return res.status(400).json({ error });// Si el Dto falla en su creacion no amerita seguir 

        const todo = await this.todoRepository.create( createTodoDto! );
        res.json( todo );
    }

    public updateTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;
        // Aqui estamos esparciendo "body", si en el Body viene el Id no queremos que la persona nos mande en el body otro ID como que lo va a actualizar
        // pero esto no nos afectara porque estamos usando el ID que viene en el Body
        const [ error, updateTodoDto ] = UpdateTodoDto.create({...req.body, id});

        if( error ) return res.status(400).json({ error });

        const updateTodo = await this.todoRepository.updateById( updateTodoDto! );
        return res.json(updateTodo);
    }

    public deleteTodo = async (req: Request, res: Response) => {
        const id = +req.params.id;

        const deletedTodo = await this.todoRepository.deleteById(id);
        res.json( deletedTodo );
    }
    // Tecnicamente todos los metodos que puedan fallar los deberiamos de encerrar entre un Try/Catch pero esto lo vamos a implementar con los casos de uso
}
