import Entrenador from "../models/team_coach.js"
import {CoachRepository} from "../Repository/coach_repository.js"
import {validationResult} from "express-validator"
import { ClassRepository } from "../Repository/class_repository.js"
import { crearClase } from "../UseCases/ClassUseCase.js"


const repositorioCoach = new CoachRepository()
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


export const registrarse = async (req,res) => {
    
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }
    const {googleId, nombre, apellido, fechaNacimiento, dni} = req.body

    const coachARegistrar = {
        nombreTemp: nombre,
        apellidoTemp: apellido,
        fechaNacimientoTemp: fechaNacimiento,
        dniTemp: dni,
    }

    
    try {
        const response = await repositorioCoach.modificarCoach(googleId, coachARegistrar)
        if(response.modifiedCount === 1 ){
            const responseObject = await repositorioCoach.buscarUnCoach(googleId)
            return res.status(200).json(responseObject[0])
        } else{
            return res.status(500).json({
                 message : "No se pudieron modificar los datos del coach. Por favor revisarlo"
                })
            }    
        } catch (error) {
            console.log(error)
            return res.status(500).json({
                message: "Revisar el error"
            })        
        }
    
        
}

export const crearClaseCoach = async (req,res) => {

    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }
    const {titulo, cupo, ubicacion, diaActividad, googleId} = req.body

    try {
        const clase = await crearClase(titulo, cupo, ubicacion, diaActividad, googleId)
        const sePudo = await repositorioCoach.crearClase(googleId, clase)
        if (sePudo.modifiedCount > 0) {
            return res.status(200).json(clase)   
        } else {
            return res.status(204).json({ message: "No se pudo crear la clase correctamente" })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Revisar el error"
        })        
    }

}


export const cancelarClase = async (req,res) => {
    
    const {idClase} = req.params
    const cancelacion = await repositorioClase.buscarClasesPorId(idClase)
    const {esCancelada} = cancelacion[0] 
    if (esCancelada) {
        return res.status(400).json({ message : "La clase ya se encuentra cancelada"})
    }

    repositorioClase.cancelarClase(idClase)
    res.status(200).json({message: "Se cancelo la clase"})

}
