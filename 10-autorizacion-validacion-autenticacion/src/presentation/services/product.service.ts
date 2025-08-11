import { ProductModel } from '../../data';
import { CreateProductDto, CustomError, PaginationDto } from '../../domain';

export class ProductService {

    constructor(){}

    async createProduct( createProductDto: CreateProductDto ){ // Ahora en el DTO ya viene el usuario y la categoria
        const productExists = await ProductModel.findOne({ name: createProductDto.name });
        if ( productExists ) throw CustomError.badRequest( 'Product already exists' );

        try {
            const product = new ProductModel(createProductDto);

            await product.save();

            return product; // Al mandar el objeto completo obtendremos mas informacion
        } catch (error) {
            // Siempre que veamos un internalServer es un error que NO ESTAMOS ESPERANDO tenemos que revisar internament lo que paso
            throw CustomError.internalServer(`${ error }`);
        }
    }

    async getProducts( paginationDto: PaginationDto) {

        const { page, limit } = paginationDto;

        try {
            const [ total, products ] = await Promise.all([
                ProductModel.countDocuments(),
                ProductModel.find()
                    .skip( (page - 1) * limit )
                    .limit( limit )
            ]);
            
            return {
                page: page,
                limit: limit,
                total: total,
                next: `/api/products?page=${ (page + 1) }&limit=${ limit }`,
                prev: (page - 1 > 0) ? `/api/products?page=${ page }&limit=${ limit }` : null,

                products: products,
            }
        } catch (error) {
            throw CustomError.internalServer('Internal Server Error');
        }
    }
}