import chalk from "chalk";
import Clase from '../models/training_class.js'

export default class Entrenador {
    constructor(nombre){
        this.nombre = nombre;
    }

    crearClase(titulo, cupo){
        let claseNueva = new Clase(titulo, cupo)
        console.log(chalk.bgBlue(JSON.stringify(claseNueva)));
        return claseNueva;
    }

    cancelarClase(clase, motivo){
        let result = false;
        if(clase !== null || clase !== undefined) {
            if(motivo !== null || motivo != '') {
                result = true;
                clase.esCancelada = true;
                clase.motivoCancelada = motivo;
            }
        }
        return result;
    }

    publicarRutina(){
        return true
    }

    darFeedback(){
        return true
    }
}
