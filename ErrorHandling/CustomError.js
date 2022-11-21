export class GenericError extends Error {

    //Se debe usar este error cuando una entidad recibe un dato invalido, null o undefined

    constructor(message,title,status) {
        super(message);
        this.status= (status =! undefined) ? status : 500;
        this.title=(status =! undefined)? title : genericErrorTitle; 
    }
}

export class DeprecatedEndpoint extends GenericError {

    //Usar esta clase de error para cuando cambiamos de funcionalidad de un metodo a otro. 
    // El metodo anterior en vez de borrarlo, debe hacer un throw lanzando un error de este tipo 
    // informando que el endpoint no esta mas en uso 

    constructor(message,title,status) {
        super(message,title,status)
    }
}


export class NotImplemented extends GenericError {

    //Se debe usar este error cuando no se esta implementando un endpoint en particular
    //suele usarse ya que no se esta trabajando sobre esta funcionalidad al momento,
    //pero la idea es usarlo en un futuro

    constructor(message,title,status) {
        super(message,title,status)
    }
}

export class InvalidProperty extends GenericError {

    //Se debe usar este error cuando una entidad recibe un dato invalido, null o undefined

    constructor(message,title,status) {
        super(message,title,status)
    }
}

export class ClassUseCaseError extends GenericError {

    //Se debe usar este error para clasificar los error capturados en ClassUseCase

    constructor(message,title,status) {
        super(message,title,status)
    }
}


export class MongoDBCannotFindError extends GenericError {

    //Se debe usar este error para clasificar los errores capturados al realizar una busqueda en MongoDB

    constructor(message,title,status) {
        super(message,title,status)

    }
}


export class MongoDBCannotInsertError extends GenericError {

    //Se debe usar este error para clasificar los errores capturados al realizar una insert en MongoDB

    constructor(message,title,status) {
        super(message,title,status)
    }
}

export class MongoDBInstanceInsertError extends GenericError {

    //Se debe usar este error para clasificar los errores capturados al realizar una insert en MongoDB

    constructor(message,title,status) {
        super(message,title,status)
    }
}

export class MongoDBInstanceUpdateError extends GenericError {

    //Se debe usar este error para clasificar los errores capturados al realizar una insert en MongoDB

    constructor(message,title,status) {
        super(message,title,status)
    }
}

export class ValidationResultError extends GenericError {

    //Se debe usar este error para clasificar los errores capturados al validar las request de la capa de servicios

    constructor(message,title,status) {
        super(message,title,status);
        
    }
}

