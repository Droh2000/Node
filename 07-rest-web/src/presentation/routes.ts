// Estas son las rutas que maneja la aplicacion

import { Router } from "express";

export class Approutes{

    // A solo que necesitemos hacer inyeccion de dependencias es donde tiene sentido crearnos una instancia de clase
    // pero caso contrario lo podemos hacer con metodos estaticos 
    static get routes(): Router {
        // Este router de express es algo que podemos mandar cuando definamos la ruta como un mddleware (Una funcion que se ejecutara cuando
        // una paeticion pase por aqui)
        const router = Router();

        // Ahora aqui definimos las rutas
        router.get('/api/todos', (req, res) => {
            // Regresamos un par de todos como ejemplo
            res.json([
                { id: 1, text: 'Buy Milk', createdAt: new Date() },
                { id: 2, text: 'Buy Bread', createdAt: null },
                { id: 3, text: 'Buy Butter', createdAt: new Date() },
            ]); // No podemos usar dos veses este metodo de enviar la respuesta, no estar creando cada una de las rutas
        });
        // Aqui solo deveriamos de definir las rutas y cual es el controlador

        return router;
    }
}