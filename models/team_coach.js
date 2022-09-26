//import Clase from '../models/training_class.js'

export default class Entrenador {
    constructor(nombre){
        this.nombre = nombre;
    }

    crearClase(titulo, cupo){
        //let claseNueva = new Clase(titulo, cupo)
        return true
    }

    cancelarClase(clase, motivo){
        return true
    }

    publicarRutina(){
        return true
    }

    darFeedback(){
        return true
    }
}
