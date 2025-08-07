import { CategoryModel } from '../../data';
import { CustomError, UserEntity } from '../../domain';
import { CreateCategoryDto } from '../../domain/dtos/category/create-category.dto';
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';
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
    async getCategories( paginationDto: PaginationDto) {

        // Sacamos los datos que esperamos de la paginacion
        // En este punto las propiedades ya vienen validas y con seguridad que vienen, asi que en este punto solo las usamos
        const { page, limit } = paginationDto;

        // Cuando hacemos una interaccion con la base de datos siempre usemos un Try/Catch
        try {
            // Si queremos saber cual es el total de registros que hay
            // tenemos que corregir que estos dos await se ejecuten de forma simultanea
            // const total = await CategoryModel.countDocuments();
            // const categories = await CategoryModel.find()
            // Las dos peticiones asyncronas de arriba las podemos hacer simultaneamente
                // Aplicamos la paginacion, con este metodo nos salteamos una cantidad de registros
                // El conteo empieza desde el 0 que seria el valor de la pagina 1, con limit es hasta donde queremos llegar
                // .skip( (page - 1) * limit )
                // Con esto traemos la cantidad de registros que queremos
                // .limit( limit );

            // A diferencia de arriba las dos peticiones se hacen de manera simultanea, nos son bloqueantes una despues de la otra
            const [ total, categories ] = await Promise.all([
                CategoryModel.countDocuments(), // -> Este es el primer valor de retorno
                CategoryModel.find()
                    .skip( (page - 1) * limit )
                    .limit( limit )
            ]);
            
            // Cambiando asi el return podemos pasarle mas datos para indicar mejor informacion al usuario
            return {
                page: page,
                limit: limit,
                total: total,
                // Es comun para quien vaya a consumir nuestro endpoint es regresarle estos datos
                next: `/api/categories?page=${ (page + 1) }&limit=${ limit }`,
                // Verificamos que no vayamos a estar en la pagina 0 para no mostrar que nos regrese a la pagina -1
                prev: (page - 1 > 0) ? `/api/categories?page=${ page }&limit=${ limit }` : null,// Hay paquetes que nos ayudan a esto, pero igual es mejor siempre evitarlos a solo que tengamos un beneficio considerable

                categories: categories.map( category => ({
                    id: category.id,
                    name: category.name,
                    available: category.available,
                }))
            }
        } catch (error) {
            throw CustomError.internalServer('Internal Server Error');
        }
    }
}