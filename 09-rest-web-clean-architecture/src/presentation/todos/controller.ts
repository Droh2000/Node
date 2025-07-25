import { Request, Response } from "express";
import { prisma } from '../../data/postgres';
import { CreateTodoDto } from '../../domain/dtos/todos/create-todo.dto';
import { UpdateTodoDto } from "../../domain/dtos";
import { CreateTodo, DeleteTodo, GetTodo, GetTodos, TodoRepository, UpdateTodo } from "../../domain";
import { error } from "console";

// Usamos los casos de uso en el controlador
export class TodosController {
    
    constructor(
        private readonly todoRepository: TodoRepository,
    ){}

    // Esto sigue la buena practica de express de no hacer estos metodos asyncronos
    public getTodos = (req: Request, res: Response) => {
        new GetTodos( this.todoRepository )
            .execute()
            .then( todos => res.json(todos) )
            .catch( error => res.status(400).json({error}) );
    }

    public getTodosById = (req: Request, res: Response) => {
        const id = +req.params.id;
        
        new GetTodo(this.todoRepository)
            .execute( id )
            .then( todo => res.json(todo) )
            .catch( error => res.status(400).json({error}) );
    }

    public createTodo = (req: Request, res: Response) => {
        const [error, createTodoDto] = CreateTodoDto.create(req.body);
        if( error ) return res.status(400).json({ error });// Este lo dejamos por si hay un error en la creacion del DTO

        new CreateTodo(this.todoRepository)
            .execute( createTodoDto! )
            .then( todo => res.json( todo ) )
            .catch( error => res.status(400).json({error}) );
    }

    public updateTodo = (req: Request, res: Response) => {
        const id = +req.params.id;
        const [ error, updateTodoDto ] = UpdateTodoDto.create({...req.body, id});
        if( error ) return res.status(400).json({ error });

        new UpdateTodo( this.todoRepository )
            .execute( updateTodoDto! )
            .then( todo => res.json(todo) )
            .catch( error => res.status(400).json({ error }) );
    }

    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id;

        new DeleteTodo( this.todoRepository )
            .execute( id )
            .then( todo => res.json( todo ) )
            .catch( error => res.status(400).json({ error }) );
    }
}
