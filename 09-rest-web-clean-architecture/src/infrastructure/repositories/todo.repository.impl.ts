import { CreateTodoDto, TodoEntity, UpdateTodoDto, TodoRepository, TodoDatasource } from '../../domain';

export class TodoRepositoryImpl implements TodoRepository {
    // Con esto le podremos mandar cualquier datasource que sea de tipo TodoDatasource y lo va a trabajar
    constructor(
        private readonly datasource: TodoDatasource,
    ){}

    // En los metodos mandamos a llamar el metodo correspondiente por medio del datasource
    create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
        return this.datasource.create(createTodoDto);
    }
    getAll(): Promise<TodoEntity[]> {
        return this.datasource.getAll();
    }
    findById(id: number): Promise<TodoEntity> {
        return this.datasource.findById(id);
    }
    updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.datasource.updateById(updateTodoDto);
    }
    deleteById(id: number): Promise<TodoEntity> {
        return this.datasource.deleteById(id);
    }

}