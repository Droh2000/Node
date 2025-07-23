import { CreateTodoDto } from "../../dtos";
import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

// Creamos una interfaces para saber cuando en el futuro cambie o se agreguen propiedades, saber que modificaciones tenemos que hacer
export interface CreateTodoUseCase{
    execute( dto: CreateTodoDto ): Promise<TodoEntity>;
}

export class CreateTodo implements CreateTodoUseCase {
    
    constructor(
        // Inyectamos el repositorio en el cual vamos a hacer el llamado
        private readonly repository: TodoRepository,
    ){}

    // Aqui es donde vamos a terminar llamando el repositorio
    execute(dto: CreateTodoDto): Promise<TodoEntity> {
        return this.repository.create(dto);
    }
}

