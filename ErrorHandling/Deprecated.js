

export class DeprecatedEndpoint extends Error{

    //Usar esta clase de error para cuando cambiamos de funcionalidad de un metodo a otro. 
    // El metodo anterior en vez de borrarlo, debe hacer un throw lanzando un error de este tipo 
    // informando que el endpoint no esta mas en uso 

    constructor(message){
        super(message)
    }
}