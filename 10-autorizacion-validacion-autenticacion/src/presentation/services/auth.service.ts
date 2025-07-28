// El servicio es el encargado de realizar la parte pesada, aqui vamos a hacer todo el proceso de cada endpoint

import { bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { UserEntity } from '../../domain/entities/user.entity';

export class AuthService {

    constructor(){}

    // Metodos por Endpoints
    public async registerUser( registerUserDto: RegisterUserDto ) {
        // Verificamos que no exista ya registrado el email
        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        if( existUser ) throw CustomError.badRequest('Email already exist');

        // Lo mejor cuando vamos a manipular en una BD es hacerlo en un Try/Catch
        try{
            // Usamos el esquema y modelo de mongoose
            const user = new UserModel(registerUserDto); // Esto nos crea el objeto con su ID

            // Requerimos hacer algunos pasos adicionales
            // Encriptar la contraseña
            user.password = bcryptAdapter.hash( registerUserDto.password );

            // Registramos en la BD
            await user.save();

            // JWT -> Para mantener la autenticacion e identificar cual usuario es

            // Email de confirmacion

            // Tomamos el objeto del usuario y crear la entidad para asegurarnos que la entidad se encargara de validar todo
            // y con esto nos evitamos que en la respuesta nos salga campo que no queremos como la __v (version) y el _id
            // No queremos mostrar el password. este campo lo tenemos que borrar, por eso hacemos la desestructuracion y en "...rest"
            // tenemos todas las demas propiedades menos el password
            const { password, ...userEntity } = UserEntity.fromObject(user);

            // Esto que retornemos es lo que tomara el controlador
            return { 
                user: userEntity, 
                token: 'ABC',// De esta forma podemos agegar mas campos que queramos regresar a la respuesta
            };
        }catch(error){
            throw CustomError.internalServer(`${ error }`);
        }
    }

    public async loginUser( loginUserDto: LoginUserDto ) {

        // Verificamos que el usuario existe
        const user = await UserModel.findOne({ email: loginUserDto.email });
        if( !user ) throw CustomError.badRequest('Email not exist');

        // Comparamos su Pass con la que tenemos almacenada en la BD
        const isMatch = bcryptAdapter.compare( loginUserDto.password, user.password );
        if( !isMatch ) throw CustomError.badRequest('Password is not valid');

        // Quitamos el campo del password
        const { password, ...userEntity } = UserEntity.fromObject( user );

        return {
            user: userEntity,
            token: 'ABC'
        }

    }
}