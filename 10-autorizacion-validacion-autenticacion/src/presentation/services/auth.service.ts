// El servicio es el encargado de realizar la parte pesada, aqui vamos a hacer todo el proceso de cada endpoint

import { bcryptAdapter, envs, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, LoginUserDto, RegisterUserDto } from "../../domain";
import { UserEntity } from '../../domain/entities/user.entity';
import { EmailService } from "./email.service";

export class AuthService {

    constructor(
        // Inyeccion de dependencias para usar el Email Service 
        private readonly emailService: EmailService,
    ){}

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
            const token = await JwtAdapter.generateToken({
                // Esto es lo que queremos guardar en el token
                id: user.id,
                email: user.email,
            });
            // Si no obtenemos el token es que algo paso
            if( !token ) throw CustomError.internalServer('Error while creating JWT');

            // Email de confirmacion
            await this.sendEmailValidationLink(user.email);

            // Tomamos el objeto del usuario y crear la entidad para asegurarnos que la entidad se encargara de validar todo
            // y con esto nos evitamos que en la respuesta nos salga campo que no queremos como la __v (version) y el _id
            // No queremos mostrar el password. este campo lo tenemos que borrar, por eso hacemos la desestructuracion y en "...rest"
            // tenemos todas las demas propiedades menos el password
            const { password, ...userEntity } = UserEntity.fromObject(user);

            // Esto que retornemos es lo que tomara el controlador
            return { 
                user: userEntity, 
                token: token,// De esta forma podemos agegar mas campos que queramos regresar a la respuesta
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

        const token = await JwtAdapter.generateToken({ id: user.id });
        if( !token ) throw CustomError.internalServer('Error while creating JWT');

        return {
            user: userEntity,
            token: token
        }

    }

    // Metodo para mandar el correo electronico
    private sendEmailValidationLink = async( email: string ) => {
        //Generamos un token para confirmar la solicitud
        const token = await JwtAdapter.generateToken({ email });
        if( !token ) throw CustomError.internalServer('Error getting token');

        // Este es el link que le vamos a regresar al usuario
        const link = `${ envs.WEBSERVICE_URL }/auth/validate-email/${ token }`;
        // Contenido que mostraremos en el mensaje del correo
        const html = `
            <h1>Validate your email</h1>
            <p>Click on yout follwing link to validate your email</p>
            <a href="${ link }">Validate your email: ${ email }</a>
        `;

        const options = {
            to: email,
            subject: "Validate your email",
            htmlBody: html,
        };

        const isSent = await this.emailService.sendEmail(options);
        // En caso que no se haya enviado el correo
        if( !isSent ) throw CustomError.internalServer('Error sending email');

        return true;
    }
}