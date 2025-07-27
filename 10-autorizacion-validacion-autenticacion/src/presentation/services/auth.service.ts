// El servicio es el encargado de realizar la parte pesada, aqui vamos a hacer todo el proceso de cada endpoint

import { UserModel } from "../../data";
import { CustomError, RegisterUserDto } from "../../domain";

export class AuthService {

    constructor(){}

    // Metodos por Endpoints
    public async registerUser( registerUserDto: RegisterUserDto ) {
        // Verificamos que no exista ya registrado el email
        const existUser = await UserModel.findOne({ email: registerUserDto.email });
        if( existUser ) throw CustomError.badRequest('Email already exist');

        // Esto que retornemos es lo que tomara el controlador
        
    }
}