import { TodoEntity } from "../../entities/todo.entity";
import { TodoRepository } from "../../repositories/todo.repository";

// Creamos una interfaces para saber cuando en el futuro cambie o se agreguen propiedades, saber que modificaciones tenemos que hacer
export interface DeleteTodoUseCase{
    execute( id: number ): Promise<TodoEntity>;
}

export class DeleteTodo implements DeleteTodoUseCase {
    
    constructor(
        // Inyectamos el repositorio en el cual vamos a hacer el llamado
        private readonly repository: TodoRepository,
    ){}

    // Aqui es donde vamos a terminar llamando el repositorio
    execute(id: number): Promise<TodoEntity> {
        return this.repository.deleteById(id);
    }
}