import { v4 as uuidv4 } from "uuid";
import { InvalidProperty } from "../ErrorHandling/CustomError.js";
import { Rol } from "./roles.js";
import Feedback from '../models/feedback.js'

export default class Alumno {
    constructor(nombre,apellido,edad,dni,aptoFisico,team,cuotaAlDia,rol,email, googleId) {
        this._id = uuidv4()
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.dni = dni
        this.aptoFisico = aptoFisico
        this.team = team
        this.cuotaAlDia = cuotaAlDia
        this.rol = rol
        this.email = email
        this.googleId = googleId,
        this.datosValidados = false
    }

    solicitarFeedback(clase, entrenador) {
        return new Feedback(this.dni, clase.titulo, entrenador.dni)
    }

    cerrarFeedback(feedback) {
        if(feedback.estado != 'completed') {
            throw new Error('Feedback no tiene contenido, no se encuentra en estado COMPLETADO.');
        }
        feedback.cerrarFeedback();
    }
}