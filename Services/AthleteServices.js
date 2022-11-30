import Alumno from "../models/team_athlete.js"
import { crearAlumno } from "../UseCases/AthleteUseCases.js"
import { AthleteRepository } from "../Repository/athlete_repository.js"
import { validationResult } from "express-validator"
import { ClassRepository } from "../Repository/class_repository.js"
import { darBajaAtleta, registrarAlumnoAClase } from "../UseCases/ClassUseCase.js"

const repositorio = new AthleteRepository()
const repositorioClase = new ClassRepository()

export const crearAtleta = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }

    const { nombre, apellido, fechaNacimiento, dni, aptoFisico, team, rol, email } = req.body

    const responseObject = new Alumno(nombre, apellido, fechaNacimiento, dni, aptoFisico, team, rol, email)
    try {
        const response = await crearAlumno(responseObject)
        return res.status(201).json(responseObject)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Hubo un error al crear una persona"
        })
    }

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

    try {
        const responseObject = await repositorio.buscarUnAtleta(googleId)
        return res.status(200).json(responseObject)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Hubo un error al buscar a una persona"
        })
    }

}

export const obtenerUnAtletaPorDni = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }

    const { dniAtleta } = req.params

    try {
        const responseObject = await repositorio.buscarUnAtletPorDni(dniAtleta)
        return res.status(200).json(responseObject)
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Hubo un error al buscar a una persona"
        })
    }

}


export const obtenerAtletas = async (req, res) => {

    try {
        const responseObject = await repositorio.buscarAtleta()
        responseObject.length > 0 ? res.status(200).json(responseObject) : res.status(204).json({ message: "No hay personas registradas" })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Hubo un error al buscar atletas"
        })
    }

}

export const finalizazrRegistracion = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }

    const { googleId, nombre, apellido, dni, fechaNacimiento, aptoFisico } = req.body

    const objectToModify = {
        nombreTemp: nombre,
        apellidoTemp: apellido,
        dniTemp: dni,
        fechaNacimiento: fechaNacimiento,
        aptoFisicoTemp: aptoFisico
    }

    try {
        const response = await repositorio.modificarAtleta(googleId, objectToModify)
        if (response.modifiedCount === 1) {
            const responseObject = await repositorio.buscarUnAtleta(googleId)
            return res.status(200).json(responseObject[0])
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "No se pudieron modificar los datos del atleta. Por favor revisarlo"
        })
    }
}

export const borrarAtleta = async (req, res) => {
    const { googleId } = req.params
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }

    try {
        const responseObject = await repositorio.buscarUnAtleta(googleId)
        const nombre = responseObject[0].nombre
        const apellido = responseObject[0].apellido

        repositorio.borrarAtleta(googleId)

        res.status(200).json({
            message: `Se borro con exito al atleta ${nombre} ${apellido}`
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Hubo un error al borrar al atleta"
        })
    }


}

export const darseDeBajaClase = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }

    const { googleId, idClase } = req.body
    try {


        const pudo = await repositorio.darseDeBajaClase(googleId, idClase)
        //const borradoDeClase = darBajaAtleta(idClase, googleId)
        if (pudo.modifiedCount > 0) {
            return res.status(200).json({
                message: "Se dio de baja al alumno con exito"
            })
        } else {
            return res.status(200).json({
                message: "No se pudo dar de baja al alumno"
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "No se pudo dar de baja al atleta"
        })
    }
}

export const unirseAClase = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }

    const { googleId, idClase } = req.body

    const cancelada = await repositorioClase.buscarClasesPorId(idClase)
    const {esCancelada} = cancelada[0]
    if(esCancelada) {
        return res.status(400).json({
            message : "No se puede anotar a una clase cancelada."
        })
    }

    try {
        const pudo = await repositorio.unirseAClase(googleId, idClase)
        const unidoAClase = registrarAlumnoAClase(idClase, googleId)
        if (pudo.modifiedCount > 0 && unidoAClase) {
            return res.status(200).json({
                message: "Se modifico con exito al atleta"
            })
        } else {
            return res.status(204).json({
                message: "No se pudo agregar al atleta correctamente a la clase"
            })
        }


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            message: "Hubo un error al agregar al atleta a una clase"
        })
    }

}