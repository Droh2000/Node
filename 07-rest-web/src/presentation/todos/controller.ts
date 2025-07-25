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

    // Como estamos manipulando la data directamente en memoria y en JS, tnedremos que tener un par de conisideraciones
    public updateTodo = (req: Request, res: Response) => {
        // Si queremos actualizar un TODO es similar al GET, inicando cual ID y con el verbo PUT, ademas tenemos que mandar un Body
        // que puede venir en los diferentes formatos que tenemos 
        const id = +req.params.id;

        if( isNaN(id) ) return res.status(400).json({ error: 'ID argument is not a number' });

        const todo = todos.find( todo => todo.id === id ); // Veririficamos que el TODO exista
        if( !todo ) return res.status(404).json({ error: `Todo with id ${ id } not found` });

        // En JS cuando estamos trabajando con Objetos, esto se pasan por referencia, es decir si modificamos este "const todo"
        // literalmente modificamos el Todo que esta en el listado de Todos de memoria, asi que no hay que hacer nada mas
        // Con el campo "createdAt" si viene es que queremos actualizarlo pero si no lo mandamos, no nos tiene por que poner null ya que no lo queremos actualizar
        // o tambien puede que no se quiere actualizar el Text sino solo el CreatedAt
        const { text, createdAt } = req.body;
        // if( !text ) return res.status(400).json({ error: 'Text property us required' });// Todas estas validaciones de verificacion mas adelante veremos como las optimizamos

        // Aqui todo esta pasando por referencia (Esto es algo que no deberiamos de hacer)
        //  todo.text = text;
        // Esto seria igual al texto siempre y cuando venga el valor, sino seria igual al mismo valor que se tenga por defecto
        todo.text = text || todo.text;
        // Como la fecha puede ser nula, en ese caso queremos usar la fecha anterior si es que viene, asi que vamos a obligar que si quieren establecer la fecha a null o borrarla, el usuario nos
        // lo tiene que mandar especificamente sino usariamos la fecha que ya viene
        ( createdAt === 'null' ) 
            ? todo.createdAt = null
            : todo.createdAt = new Date( createdAt || todo.createdAt );// Si no tenemos el "createdAt" que utilize el valor que ya tenemos

        // Para evitar actualizar por referencia (Manejarlo de una menra inmutable)
        /*todos.forEach( (todo, index) => {
            if( todo.id === id ){
                todos[index] = todo;
            }
        });*/

        res.json( todo );
    }

    // En el Delete no necesariamente se tiene eliminar, tambien es comun que se marque el registro como que ya no existe (Como inactivo)
    // en nuestro caso lo queremos borrar fisicamente del listado
    public deleteTodo = (req: Request, res: Response) => {
        const id = +req.params.id; // Tomamos el Id del argumento

        const todo = todos.find( todo => todo.id === id );
        if( !todo ) return res.status(404).json({ error: `Todo with id ${ id } not found` });

        // Si eixste cortamos el elemento del arreglo
        todos.splice( todos.indexOf(todo), 1 );
        
        // Regresamos el Todo eliminado
        res.json( todo );
    }
}
