import { CategoryModel } from '../../data';
import { CustomError, UserEntity } from '../../domain';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';
// La ruta llama al controlador y del controlador llama al servicio

export class CategoryService {

    // Creamos para que se pueda aplicar la inyeccion de dependencias para que asi se pueda
    // cambiar la Base de datos o el patron repositorio
    constructor(){}

    // Queremos crear la categoria que esta en "category.model" por tanto ahi vemos que datos son los que nesecitamos aqui
    // tomando en cuenta que los campos "available" viene del Dto y el User ya lo sacamos
    // el middleware se encargara de extraer los datos y proveer el mismo tipo de dato
    async createCategory( createCategoryDto: CreateCategoryDto, user: UserEntity ){
        // Verificamos si la categoria existe
        const categoryExists = await CategoryModel.findOne({ name: createCategoryDto.name });
        if ( categoryExists ) throw CustomError.badRequest( 'Category already exists' );

        try {
            const category = new CategoryModel({
                ...createCategoryDto, // Le pasamos todas las propiedades (Porque ya todas estan validadas y tienen el formato correcto)
                user: user.id, // Solo esta data queremos pasar del usuario
            });

            await category.save();

            // Para que no nos salga informacion de mas, mejor especificamos aqui los datos que queremos mostrar
            return {
                id: category.id,
                name: category.name,
                available: category.available,
            }
        } catch (error) {
            // Estos errores hay que cuidarlos porque a cualquier usuario que este consumiendo la API le dara informacion del sistema
            throw CustomError.internalServer(`${ error }`);
        }
    }

    // Con este metodo vamos a obtener todas las categorias registradas
    async getCategories() {
        // Cuando hacemos una interaccion con la base de datos siempre usemos un Try/Catch
        try {
            const categories = await CategoryModel.find();

            return categories.map( category => ({
                id: category.id,
                name: category.name,
                available: category.available,
            }));
        } catch (error) {
            throw CustomError.internalServer('Internal Server Error');
        }
    }
}