import { validationResult } from "express-validator";
import { GenericError, NotImplemented } from "../ErrorHandling/CustomError.js";
import { recordsNotFound, response400, validationResultError } from "../Repository/helpers/ErrorHelper.js";
import {cantCreateMessage, cantModifyMessage} from "../Repository/helpers/main.js"
import{buscarClases, buscarClasesPorNombre, registrarAlumnoAClase,cancelarClase} from "../UseCases/ClassUseCase.js";


const validarRequest= (req)=>{
    const errors= validationResult(req);
        if(!errors.isEmpty){
            throw new ValidationResultError(validationResultError + errors.array());
        }
}

export const obtenerClases= async (req, res) =>{
    try{
        const responseObject = await buscarClases();
        responseObject.length > 0 ? res.status(200).json(responseObject) : res.status(404).json({ message: "No hay clases registradas" });    
    }catch(error){
        if(error instanceof GenericError){
            return res.status(error.status).json({
                mensaje: error.title,
                errores: error.message
            })
        }

        return res.status(500).json({
            mensaje: response500,
            errores: error.message
        })
    }
}


export const obtenerClasesPorNombre= async (req, res) => {
    try{
        this.validarRequest(req);
        const {nombre}= req.body;
        const responseObject = await buscarClasesPorNombre(nombre);
        responseObject.length > 0 ? res.status(200).json(responseObject) : res.status(204).json({ message: recordsNotFound });    
    }catch(error){
        if(error instanceof GenericError){
            return res.status(error.status).json({
                mensaje: error.title,
                errores: error.message
            })
        }

        return res.status(500).json({
            mensaje: response500,
            errores: error.message
        })
    }
}

export const crearClase= async (req, res) => {
    try{
        this.validarRequest(req)
        const{titulo, cupo, ubicacion, diaActividad, coachId}= req.body;
        const responseObject = await crearClase(titulo, cupo, ubicacion, diaActividad, coach);
        responseObject =! false ? res.status(200).json(responseObject) : res.status(204).json({ message: cantCreateMessage });    
    }catch(error){
        if(error instanceof GenericError){
            return res.status(error.status).json({
                mensaje: error.title,
                errores: error.message
            })
        }

        return res.status(500).json({
            mensaje: response500,
            errores: error.message
        })
    }
}


export const cancelarClases= async (req, res) => {
    try{
        this.validarRequest(req)
        const responseObject = await cancelarClase(req.body);
        responseObject.length > 0 ? res.status(200).json(responseObject) : res.status(204).json({ message: recordsNotFound });    
    }catch(error){
        if(error instanceof GenericError){
            return res.status(error.status).json({
                mensaje: error.title,
                errores: error.message
            })
        }

        return res.status(500).json({
            mensaje: response500,
            errores: error.message
        })
    }
}


export const registrarAlumnoAclases= async (req, res) => {
 try{
        this.validarRequest(req)
        const responseObject = await registrarAlumnoAClase(req.body);
        responseObject.length != false ? res.status(200).json(responseObject) : res.status(204).json({ message: cantModifyMessage });    
    }catch(error){
        if(error instanceof GenericError){
            return res.status(error.status).json({
                mensaje: error.title,
                errores: error.message
            })
        }

        return res.status(500).json({
            mensaje: response500,
            errores: error.message
        })
    }
}

