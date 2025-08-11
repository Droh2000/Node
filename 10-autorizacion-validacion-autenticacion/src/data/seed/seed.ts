import { envs } from "../../config";
import { CategoryModel } from "../mongo/models/category.model";
import { ProductModel } from "../mongo/models/product.model";
import { UserModel } from "../mongo/models/user.model";
import { MongoDatabse } from "../mongo/mongo-database";
import { seedData } from "./data";

// Aqui van a estar los procedimientos que vamos a ejecutar para llenar la BD
(async() => {
    // Conectamos a la base de datos de mongo
    await MongoDatabse.connect({
        dbName: envs.MONGO_DB_NAME,
        mongoUrl: envs.MONGO_URL, 
    });

    await main();

    // Esto es para que finalize el proceso y no se quede pegado
    await MongoDatabse.disconnect();
})();

// Como la creacion de categorias y productos se requiere data como el usuario, creamos estas funciones auxiliares
// para tomar un rango de datos aleatorios
const randomBetween0AndX = ( x: number ) => {
    return Math.floor( Math.random() * x );
}

async function main(){

    // Borrar Todo -> Antes que nada asegurarnos que no haya informacion basura
    await Promise.all([
        UserModel.deleteMany(),
        CategoryModel.deleteMany(),
        ProductModel.deleteMany(),
    ]);

    // Crear usuarios
    const users = await UserModel.insertMany( seedData.users );

    // Crear Categorias
    const categories = await CategoryModel.insertMany(
        // recorremos todas las categorias
        seedData.categories.map( category => {
            return {
                ...category,
                user: users[0]._id // El usuario lo podriamos asignar de manera aleatoria
            }
        })
    );

    // Crear Productos
    const products = await ProductModel.insertMany(
        seedData.products.map( product => {
            return {
                ...product,
                user: users[ randomBetween0AndX( seedData.users.length - 1 ) ]._id,
                category: categories[ randomBetween0AndX( seedData.categories.length - 1 ) ]._id
            }
        })
    );
}

// Como este es un procedimiento que estamos realizando, el mejor lugar para colocarlo es en el Package.json
// cuales son las instrucciones que tiene que hacer
// para llenar la base de datos vamos a mandar a llamar ese script "seed"
// Hay que tener cuidado de no subir este script a produccion porque podriamos destruir la base de datos