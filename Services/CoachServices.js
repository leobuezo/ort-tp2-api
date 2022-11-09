import Entrenador from "../models/team_coach.js"
import {CoachStorage} from "../Repository/coach_repository.js"
import {validationResult} from "express-validator"
import { NotImplemented } from "../ErrorHandling/CustomError.js"

const repositorioCoach = new CoachStorage()

export const crearCoach = async (req, res) => {
    
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }

    const {nombre, apellido, edad, dni, rol, team, email} = req.body
    const responseObject = new Entrenador(nombre, apellido, edad, dni, rol, team, email)
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
    
    const{dni} = req.params
    const errors = validationResult(req)
    
    if(!errors.isEmpty()){
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }
    
    const responseObject = await repositorioCoach.buscarUnCoach(dni)
    repositorioCoach.borrarCoach(dni)
    res.status(200).json({message: "Se borro con exito al coach"})
}

export const obtenerUnCoach = async (req,res) => {
    
    const{dni} = req.params
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }

    const responseObject = await repositorioCoach.buscarUnCoach(dni)
    return res.status(200).json(responseObject)
}

export const obtenerCoaches = async (req,res) => {
    const responseObject = await repositorioCoach.buscarCoach()
    responseObject.length ? res.status(200).json(responseObject) : res.status().json({ message: "No hay coaches registrados" })
}

export const crearClase = async (req,res) => {
    throw new NotImplemented("Este endpoint no esta siendo implementado")
}
