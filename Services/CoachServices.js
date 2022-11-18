import Entrenador from "../models/team_coach.js"
import {CoachStorage} from "../Repository/coach_repository.js"
import {validationResult} from "express-validator"
import { NotImplemented } from "../ErrorHandling/CustomError.js"
import {ClassRepository} from "../Repository/coach_repository.js"

const repositorioCoach = new CoachStorage()
const repositorioClase = new ClassRepository()

export const crearCoach = async (req, res) => {
    
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }

    const {nombre, apellido, fechaNacimiento, dni, rol, team, email} = req.body
    const responseObject = new Entrenador(nombre, apellido, fechaNacimiento, dni, rol, team, email)
    const response = crearCoach(responseObject)
    return res.status(200).json(responseObject)

}

export const darFeedback = async (req,res) => {
    throw new NotImplemented("Este endpoint no esta siendo implementado")
}

export const modificarCoach = async (req,res) => {
    throw new NotImplemented("Este endpoint no esta siendo implementado")
}

export const borrarCoach = async (req,res) => {
    
    const{googleId} = req.params
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }
    
    const responseObject = await repositorioCoach.buscarUnCoach(googleId)
    repositorioCoach.borrarCoach(googleId)
    res.status(200).json({message: "Se borro con exito al coach"})
}

export const obtenerUnCoach = async (req,res) => {
    
    const{googleId} = req.params
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }

    const responseObject = await repositorioCoach.buscarUnCoach(googleId)
    return res.status(200).json(responseObject)
}

export const obtenerCoaches = async (req,res) => {
    const responseObject = await repositorioCoach.buscarCoach()
    responseObject.length ? res.status(200).json(responseObject) : res.status().json({ message: "No hay coaches registrados" })
}

export const buscarCoachPorDni = async (req,res) => {
    const{dni} = req.params
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }

    const responseObject = await repositorioCoach.buscarCoachPorDni(dni)
    return res.status(200).json(responseObject)
}

export const crearClase = async (req,res) => {
    throw new NotImplemented("Este endpoint no esta siendo implementado")
    /*
    
    const {titulo, cupo, ubicacion, diaActividad} = req.body
    
    

    */
}


export const registrarse = async (req,res) => {
    
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }
    const {googleId, nombre, apellido, fechaNacimiento, dni, rol, team, email} = req.params

    const coachARegistrar = {
        nombreTemp: nombre,
        apellidoTemp: apellido,
        fechaNacimientoTemp: fechaNacimiento,
        dniTemp: dni,
        rolTemp: rol,
        teamTemp: team,
        emailTemp: email,
    }

    repositorioCoach.modificarCoach(googleId, coachARegistrar)
        .then(() => {
            return res.status(200).json({
                message: "Se registro con exito al coach"
            })
        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: "No se pudo completar los datos del coach, por favor revise los errores",
                errores: err
            })
        })
}
