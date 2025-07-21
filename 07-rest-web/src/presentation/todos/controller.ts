// El controlador es algo que podamso extraer y cortar solo lo que requieramos

import { Request, Response } from "express";

export class TodosController {
    // Esto no tendra metodos estaticos porque en los controladores vamos a querer hacer la inyeccion de dependencia
    // Por ejemplo inyecta un repositorio y que las ruttas hagan el trabajo de ese repositorio o para usarlo por casos de uso
    constructor(){}

    // Extraemos la funcion interna que teniamos en la ruta definida
    public getTodos = (req: Request, res: Response) => {
        // Regresamos un par de todos como ejemplo
        res.json([
            { id: 1, text: 'Buy Milk', createdAt: new Date() },
            { id: 2, text: 'Buy Bread', createdAt: null },
            { id: 3, text: 'Buy Butter', createdAt: new Date() },
        ]); // No podemos usar dos veses este metodo de enviar la respuesta, no estar creando cada una de las rutas
    }
}
