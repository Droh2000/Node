import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

export abstract class TodoDatasource {
    // En el Dto ya sabemos que informacion va a venir, si hay algun cambio solo modificariamos el DTo y no hay que cambiar nada mas
    abstract create( createTodoDto: CreateTodoDto ): Promise<TodoEntity>;
    // TODO: Aqui en el futuro recibiremos una paginacion y otros argumentos
    abstract getAll(): Promise<TodoEntity[]>;
    
    abstract findById( id: number ): Promise<TodoEntity>;
    abstract updateById( updateTodoDto: UpdateTodoDto ): Promise<TodoEntity>;
    abstract deleteById( id: number ): Promise<TodoEntity>;
}