// El controlador es algo que podamso extraer y cortar solo lo que requieramos

import { Request, Response } from "express";

const todos = [
    { id: 1, text: 'Buy Milk', createdAt: new Date() },
    { id: 2, text: 'Buy Bread', createdAt: null },
    { id: 3, text: 'Buy Butter', createdAt: new Date() },
    // Lo que requerimos en POST es insertar un nuevo TODO pero el ID lo debemos de determinar porque sabemos cual es el ultimo registro
    // y tambien deberiamos de considerar si vamos a recibir el "createdAt" o no, porque si estamos creando uno nuevo no tiene sentido 
    // crearlo completado
];

export class TodosController {
    // Esto no tendra metodos estaticos porque en los controladores vamos a querer hacer la inyeccion de dependencia
    // Por ejemplo inyecta un repositorio y que las ruttas hagan el trabajo de ese repositorio o para usarlo por casos de uso
    constructor(){}

    // Extraemos la funcion interna que teniamos en la ruta definida
    public getTodos = (req: Request, res: Response) => {
        // Regresamos un par de todos como ejemplo
        return res.json(todos); // No podemos usar dos veses este metodo de enviar la respuesta, no estar creando cada una de las rutas
    }

    public getTodosById = (req: Request, res: Response) => {
        // Obtenemos el argumento que viene por el segmento del URL
        const id = +req.params.id; // Le agregamos el + para convertirlo a numero

        // Verificamos que en el caso que no sea un numero por tanto nos regresa un NaN
        // este es el codigo de estatus que se usa cuando no se manda la informacion que se espera
        if( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = todos.find( todo => todo.id === id );

        // Regresar el Status de acuerdo a lo que se encontro
        // Tambien alguien nos puede mandar por argumento algo que no existe, en ese caso tenemso que regresar un 404
        (todo) ? res.json(todo) : res.status(404).json({ error: `TODO with id ${id} not found` })
    }

    // Crear un recurso (Peticion POST)
    public createTodo = (req: Request, res: Response) => {
        // Cuando hacemos un POSt viene un tipo de payload (body), hay varias formas de mandar un body en Postman, en caso de elegir RAW
        // cuando creamos el Backend tenemos que suponer que las personas que lo van a usar no son de confianza, suponiendo que nos van a mandar 
        // informacion que tenemos que validar, para empezar es el Backend el que nos tiene que asignar el ID, no es el cliente
        /*
            {
                "text": "Buy video games",
                "hello": 'world',
                "id": 12345678
            }
        */
        // Debemos de obtener el body de la peticion
        const { text } = req.body;

        // Si no viene el texto, lanzamos un error (le ponemos return para que no sigua ejecutando nada mas)
        // Igual podriamos verificar que si vienen mas propiedades que de las que estamos esperando, lanze un error
        if( !text ) return res.status(400).json({ error: `Text Property is required` });

        // Tenemos un problema si queremos insertar el Body
        //  todos.push( body );
        // Si hacemos la prueba veremos que nos lo inserta de una forma que no es (De forma directa)
        // hay que hacer validaciones, por eso es mejor desestructurar solo lo que nos interesa
        // Portanto no insertamos directamente el body si no un nuevo TODO
        const newTodo = {
            id: todos.length + 1, // Esto es por ahora
            text: text,
            createdAt: null,
        };

        todos.push(newTodo);

        // Por defecto le tenemos que decir a Express como queremos manejar esa serializacion de las peticiones de POST
        // el como va a venir la informacion y como la esperamos (Lo mas comun es que sea JSON la comunicacion)
        res.json( newTodo );
    }

}
