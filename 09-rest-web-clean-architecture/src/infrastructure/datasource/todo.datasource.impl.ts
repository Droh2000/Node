import { prisma } from "../../data/postgres";
import { CreateTodoDto, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";

// Aqui es donde vamos a regresar el trabajo de la implementacion, la logica la sacamos del controlador
// toda esta implementacion resume de como nos queremos conectar a la base de datos de posgreSQL
export class TodoDatasourceImpl implements TodoDatasource {
    
    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        // Le mandamos donde suceda la creacion en el metodo correspondiente del controlador
        const todo = await prisma.todo.create({
            data: createTodoDto!
        }); // recibimos todo lo necesario para la creacion

        return TodoEntity.fromObject( todo );
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

    async findById(id: number): Promise<TodoEntity> {
        // Sacamos especificamente este codigo del controlador 
        const todo = await prisma.todo.findFirst({
            where: { id }
        });

        // Verificamos si se encontro o no el todo
        if( !todo ) throw `Todo with id ${ id } not found`;

        return TodoEntity.fromObject(todo);
    }

    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        // Como tenemos que verificar si existe primero, vamos a reutilizar el metodo que ya tenemos aqui
        // ademas porque este metodo por defecto ya nos lanzara un error porque ahi ya esta la verificacion
        await this.findById( updateTodoDto.id );

        // Actualizamos con el codigo sacado del controlador
        const updateTodo = await prisma.todo.update({
            where: { id: updateTodoDto.id }, // Despues configuraremos esto para que el Id no vaya a venir en el Body de la peticion
            data: updateTodoDto!.values
        });

        // Convertimos el que nos regresa la BD
        return TodoEntity.fromObject(updateTodo);
    }

    async deleteById(id: number): Promise<TodoEntity> {
        // Verificamos si existe reutilizando el metodo de aqui
        await this.findById( id ); // Si esto lanza un excepcion, nos afectara en todo el proceso

        // Codigo sacado del controlador donde sucede 
        const deleted = await prisma.todo.delete({
            where: { id }
        });

        // Le mandamos el objeto que se elimino
        return TodoEntity.fromObject( deleted );
    }
}