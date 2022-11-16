

export class DeprecatedEndpoint extends Error {

    //Usar esta clase de error para cuando cambiamos de funcionalidad de un metodo a otro. 
    // El metodo anterior en vez de borrarlo, debe hacer un throw lanzando un error de este tipo 
    // informando que el endpoint no esta mas en uso 

    constructor(message) {
        super(message)
    }
}


export class NotImplemented extends Error {

    //Se debe usar este error cuando no se esta implementando un endpoint en particular
    //suele usarse ya que no se esta trabajando sobre esta funcionalidad al momento,
    //pero la idea es usarlo en un futuro

    constructor(message) {
        super(message)
    }
}

export class InvalidProperty extends Error {

    //Se debe usar este error cuando una entidad recibe un dato invalido, null o undefined

    constructor(message) {
        super(message)
    }
}

export class ClassUseCaseError extends Error {

    //Se debe usar este error para clasificar los error capturados en ClassUseCase

    constructor(message) {
        super(message)
    }
}


export class MongoDBCannotFindError extends Error {

    //Se debe usar este error para clasificar los errores capturados al realizar una busqueda en MongoDB

    constructor(message) {
        super(message)
    }
}