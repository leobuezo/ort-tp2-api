import Entrenador from "../models/team_coach.js"
import {CoachRepository} from "../Repository/coach_repository.js"
import {validationResult} from "express-validator"
import { NotImplemented } from "../ErrorHandling/CustomError.js"
import { ClassRepository } from "../Repository/class_repository.js"
import FeedbackRepository from "../Repository/feedback_respository.js"
//import { crearClase } from "../UseCases/ClassUseCase"

const repositorioCoach = new CoachRepository()
const repositorioClase = new ClassRepository()
const repositorioFeedback = new FeedbackRepository()

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

//se va a usar??
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

export const registrarse = async (req,res) => {
    
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }
    const {googleId, nombre, apellido, fechaNacimiento, dni} = req.params

    const coachARegistrar = {
        nombreTemp: nombre,
        apellidoTemp: apellido,
        fechaNacimientoTemp: fechaNacimiento,
        dniTemp: dni,
    }

    repositorioCoach.modificarCoach(googleId, coachARegistrar)
        .then(() => {
            return res.status(200).json({
                message: "Se registro con exito al coach"
            })
        })
        .catch(err => {
            console.log(error)
            return res.status(500).json({
                message: "No se pudo completar los datos del coach, por favor revise los errores",
                errores: error
            })
        })
    
        if(response.modifiedCount === 1 ){
            const responseObject = await repositorio.buscarUnCoach(googleId)
            return res.status(200).json(responseObject)
        } else{
            return res.status(500).json({
                message : "No se pudieron modificar los datos del coach. Por favor revisarlo"
            })
        }
}
/*
export const crearClase = async (req,res) => {

    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }

    const {titulo, cupo, ubicacion, diaActividad} = req.body
    const responseObject = new Clase (titulo, cupo, ubicacion, diaActividad)
    crearClase(responseObject)

    return res.status(200).json(responseObject)   
}
*/
export const darFeedback = async (req,res) => {

    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }
//CAMBIAR A GOOGLEID
    const { dni_atleta, titulo_clase, dni_coach } = req.body
    const responseObject = new Feedback (dni_atleta, titulo_clase, dni_coach)
    repositorioFeedback.darFeedback(responseObject)

    return res.status(200).json(responseObject)   
}

export const cancelarClase = async (req,res) => {
    
    const {idClase} = req.body

    repositorioClase.cancelarClase(idClase)

}
