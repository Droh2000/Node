import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";

// Aqui es donde vamos a regresar el trabajo de la implementacion, la logica la sacamos del controlador
export class TodoDatasourceImpl implements TodoDatasource {
    
    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }

    async getAll(): Promise<TodoEntity[]> {
        const todos = await prisma.todo.findMany();
        // El "todos" es solo un objeto que tiene las propiedades pero no es la entidad
        // porque a pesar que tenga propiedades similares, tambien tenemos el Get que nos diga si esta completado o no
        // y puede que lo estemos usando.

        // Aqui nos toca hacer un Maper, tomando la informacion que tenemos en "todos" y tranformarla en "TodosEntity"
        // mandamos cada propiedad a la funcion maper y nos lo convierte
        return todos.map( TodoEntity.fromObject );
    }

    findById(id: number): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }

    updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }

    deleteById(id: number): Promise<TodoEntity> {
        throw new Error("Method not implemented.");
    }
}