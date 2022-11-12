import { v4 as uuidv4 } from "uuid";
import { InvalidProperty } from "../ErrorHandling/CustomError.js";
import { Rol } from "./roles.js";
import Feedback from '../models/feedback.js'

export default class Alumno {
    constructor(nombre, apellido, edad, dni, aptoFisico, team, rol, email, googleId) {
        this._id = uuidv4()
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.dni = dni
        this.aptoFisico = aptoFisico
        this.team = team
        this.cuotaAlDia = true
        this.rol = rol
        this.email = email
        this.googleId = googleId
    }

    validateNombre(name) {
        if (!name) {
            throw new InvalidProperty(`El nombre es invalido. Por favor ingrese un dato valido`)
        }
        return name
    }
    validateApellido(apellido) {
        if (!apellido) {
            throw new InvalidProperty(`El apellido es invalido. Por favor ingrese un dato valido`)
        }
        return apellido
    }
    validateEdad(edad) {
        if (!edad) {
            if (edad === 0) {
                return edad
            }
            throw new InvalidProperty(`La edad es invalida. Por favor ingrese un numero mayor a 0`)
        }
        return edad
    }

    validateDni(dni) {
        if (!dni) {
            if (dni === 0) {
                return dni
            }
            throw new InvalidProperty(`El dni es invalido. Por favor, ingrese un dato valido`)
        }
        return dni
    }

    validateRol(rol) {
        if (rol !== "Athlete") {
            throw new InvalidProperty(`El rol ${rol} no le pertenece al atleta.`)
        }
        return new Rol(rol)
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