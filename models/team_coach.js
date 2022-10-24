import chalk from "chalk";
import Clase from '../models/training_class.js'
import { Rol } from './roles.js'
import { ClassRepository } from "../Repositorio/class_repository.js";

export class Entrenador {
    constructor(nombre,edad, dni, rol){
        this.nombre = nombre;
        this.edad = edad
        this.dni = dni
        this.rol = new Rol(rol)
        this.repository = new ClassRepository()
    }

    crearClase(titulo, cupo){
        return this.repository.crearClase(titulo,cupo)
//        let claseNueva = new Clase(titulo, cupo)
//        console.log(chalk.bgBlue(JSON.stringify(claseNueva)));
//        return claseNueva;
    }

    cancelarClase(clase, motivo){

        if (motivo !== undefined && motivo !== null && motivo !== "") {
            this.storage.cancelarClase(clase)
            clase.esCanelada = true
            clase.motivoCancelada = motivo;
        } else {
            throw new Error("Para cancelar una clase se debe proveer un motivo")
        }
/*
        let result = false;
        if(clase !== null || clase !== undefined) {
            if(motivo !== null || motivo != '') {
                result = true;
                clase.esCancelada = true;
                clase.motivoCancelada = motivo;
            }
        }
        return result;
*/
    }

    publicarRutina(){
        return true
    }

    darFeedback(){
        return true
    }
}
