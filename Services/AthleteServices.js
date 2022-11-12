import { NotImplemented } from "../ErrorHandling/CustomError.js"
import Alumno from "../models/team_athlete.js"
import { crearAlumno, agregarTeam } from "../UseCases/AthleteUseCases.js"
import { AthleteRepository } from "../Repository/athlete_repository.js"
import { validationResult } from "express-validator"
import { response } from "express"

const repositorio = new AthleteRepository()

export const crearAtleta = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }

    const { nombre, apellido, edad, dni, aptoFisico, team, rol, email } = req.body

    const responseObject = new Alumno(nombre, apellido, edad, dni, aptoFisico, team, rol, email)
    const response = crearAlumno(responseObject)

    return res.status(200).json(responseObject)
}

export const obtenerUnAtleta = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }

    const { googleId } = req.params

    console.log(req.params)

    const responseObject = await repositorio.buscarUnAtleta(googleId)

    return res.status(200).json(responseObject)
}

export const obtenerAtletas = async (req, res) => {
    const responseObject = await repositorio.buscarAtleta()

    responseObject.length ? res.status(200).json(responseObject) : res.status().json({ message: "No hay personas registradas" })
}

export const modificarAtleta = async (req, res) => {
    //throw new NotImplemented("Este endpoint no esta siendo implementado")

    const {googleId, dni, edad } = req.body

    repositorio.modificarAtleta(googleId,dni,edad)
    .then(() => {
        return res.status(200).json({
            message : "Se modificaron con exito los datos del atleta"
        })
    })
    .catch(err => {
        console.log(err)
        return res.status(500).json({
            message : "No se pudo modificar al atleta, por favor revise los errores",
            errores: err
        })
    })
    
    

}

export const agregarAlTeam = async (req, res) => {

    const { dni, team } = req.body

    const responseObject = await agregarTeam(dni, team)

    responseObject ? res.status(200).json({ message: "El atleta ha sido agregado al team con exito" }) : res.status(400).json("No se pudo agregar al atleta al team")

}

export const borrarAtleta = async (req, res) => {
    const { dni } = req.params
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }
    const responseObject = await repositorio.buscarUnAtleta(dni)
    const nombre = responseObject[0].nombre
    const apellido = responseObject[0].apellido

    repositorio.borrarAtleta(dni)

    res.status(204).json({message : `Se borro con exito al atleta ${nombre} ${apellido}`})
}