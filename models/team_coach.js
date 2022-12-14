import chalk from "chalk";
import Clase from '../models/training_class.js'
import { Rol } from './roles.js'
import { ClassRepository } from "../Repository/class_repository.js";

export default class Entrenador {
    constructor(nombre, apellido, email, dni, rol, team, fechaNacimiento, googleId,picture){
        this.nombre = nombre
        this.apellido = apellido
        this.email = email
        this.dni = dni
        this.rol = rol
        this.team = team
        this.fechaNacimiento = fechaNacimiento
        this.googleId = googleId
        this.datosValidados = false,
        this.picture = picture
        this.clases = []
    }

    crearClase(titulo, cupo){
        //return this.repository.crearClase(titulo,cupo)
        let claseNueva = new Clase(titulo, cupo)
        console.log(chalk.bgBlue(`Creando una nueva clase de entrenamiento por ${this.nombre}`));
        console.log(JSON.stringify(claseNueva));
        return claseNueva;
    }

    cancelarClase(clase, motivo){

        if (motivo !== undefined && motivo !== null && motivo !== "") {
            this.storage.cancelarClase(clase)
            clase.esCanelada = true
            clase.motivoCancelada = motivo;
        } else {
            throw new Error("Para cancelar una clase se debe proveer un motivo")
        }

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

    darFeedback(feedback, feedbackContent){
        if(feedbackContent == null || feedbackContent == undefined) {
            throw new Error('Feedback debe tener un contenido válido.');
        }
        feedback.darFeedback(feedbackContent);
    }

}
