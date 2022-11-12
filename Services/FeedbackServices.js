import { NotImplemented } from "../ErrorHandling/CustomError.js"
import FeedbackRepository from "../Repository/feedback_respository.js"
import { validationResult } from "express-validator"
import Feedback from "../models/feedback.js"

const repositorio = new FeedbackRepository()


export const obtenerUnFeedbackPorId = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }
    const { _id } = req.params
    const responseObject = await repositorio.obtenerUnFeedbackPorId(_id)
    return res.status(200).json(responseObject)
}

export const obtenerUnFeedbackPorAtleta = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }
    const { dni_atleta } = req.params
    const responseObject = await repositorio.obtenerUnFeedbackPorAtleta(dni_atleta)
    return res.status(200).json(responseObject)
}

export const obtenerUnFeedbackPorCoach = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }
    const { dni_coach } = req.params
    const responseObject = await repositorio.obtenerUnFeedbackPorCoach(dni_coach)
    return res.status(200).json(responseObject)
}

export const obtenerFeedbacks = async (req, res) => {
    const responseObject = await repositorio.obtenerFeedbacks()
    responseObject.length ? res.status(200).json(responseObject) : res.status().json({ message: "No hay personas registradas" })
}

export const borrarFeedback = async (req, res) => {
    const { dni_atleta } = req.params
    console.log('deleting: ', dni_atleta)
    const responseObject = await repositorio.obtenerUnFeedbackPorAtleta(dni_atleta)
    console.log(responseObject)
    const id = responseObject._id
    const responseDeleteObject = await repositorio.borrarFeedback(id)
    console.log('responseDeleteObject: ', responseDeleteObject)
    return res.status(200).json({message : `Se borro con exito el feedback con id: ${id}`});
}

export const crearFeedback = async (req, res) => {
    const { dni_atleta, titulo_clase, dni_coach } = req.body
    const nuevoFeedback = new Feedback(dni_atleta, titulo_clase, dni_coach)
    const feedbackCreado = repositorio.crearFeedback(nuevoFeedback)
//    const team = repositorioTeam.crearTeam(nombre, codigo)
    res.status(201).json(feedbackCreado)
}
