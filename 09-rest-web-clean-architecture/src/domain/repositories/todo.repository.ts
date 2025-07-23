import { CreateTodoDto, UpdateTodoDto } from "../dtos";
import { TodoEntity } from "../entities/todo.entity";

// La diferencia aqui es que usamos el repositorio para llegar al Datasource
export abstract class TodoRepository {
    
    abstract create( createTodoDto: CreateTodoDto ): Promise<TodoEntity>;
    abstract getAll(): Promise<TodoEntity[]>;
    
    abstract findById( id: number ): Promise<TodoEntity>;
    abstract updateById( updateTodoDto: UpdateTodoDto ): Promise<TodoEntity>;
    abstract deleteById( id: number ): Promise<TodoEntity>;
}