import { v4 as uuidv4 } from "uuid";
import { InvalidProperty } from "../ErrorHandling/CustomError.js";
import { Rol } from "./roles.js";
import Feedback from '../models/feedback.js'

export default class Alumno {
    constructor(nombre, apellido, edad, dni, aptoFisico, team, rol, email) {
        this._id = uuidv4()
        this.nombre = this.validateNombre(nombre)
        this.apellido = this.validateApellido(apellido)
        this.edad = this.validateEdad(edad)
        this.dni = this.validateDni(dni)
        this.aptoFisico = aptoFisico
        this.team = team
        this.cuotaAlDia = true
        this.rol = this.validateRol(rol)
        this.email = email
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
            throw new InvalidProperty(`La edad es invalida. Por favor ingrese un numero mayor a 0`)
        }
        return edad
    }

    validateDni(dni) {
        if (!dni) {
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