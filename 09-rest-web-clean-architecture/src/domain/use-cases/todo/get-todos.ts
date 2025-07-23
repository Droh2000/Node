import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

// Creamos una interfaces para saber cuando en el futuro cambie o se agreguen propiedades, saber que modificaciones tenemos que hacer
export interface GetTodosUseCase{
    execute(): Promise<TodoEntity[]>;
}

export class GetTodos implements GetTodosUseCase {
    
    constructor(
        // Inyectamos el repositorio en el cual vamos a hacer el llamado
        private readonly repository: TodoRepository,
    ){}

    // Aqui es donde vamos a terminar llamando el repositorio
    execute(): Promise<TodoEntity[]> {
        return this.repository.getAll();
    }
}