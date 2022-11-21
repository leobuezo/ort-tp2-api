import { validationResult } from "express-validator";
import { NotImplemented, ValidationResultError } from "../ErrorHandling/CustomError.js";
import { response400, validationResultError } from "../Repository/helpers/ErrorHelper.js";
import{buscarClases} from "../UseCases/ClassUseCase.js";

export const obtenerClases= async (req, res) =>{
    try{
        const responseObject = await buscarClases();
        responseObject.length > 0 ? res.status(200).json(responseObject) : res.status(204).json({ message: "No hay clases registradas" });    
    }catch(error){
        console.error(error)
        return res.status(400).json({
            mensaje: response400,
            errores: error.message
        })
    }
}


export const buscarClase= async (req, res) => {
    try{
        const errors= validationResult(req);
        if(!errors.isEmpty){
            throw new ValidationResultError(validationResultError + errors.array());
        }
        const responseObject = await buscarClase();
        responseObject.length > 0 ? res.status(200).json(responseObject) : res.status(204).json({ message: "No hay clases registradas" });    
    }catch(error){
        return res.status(400).json({
            mensaje: response400,
            errores: error.message
        })
    }
}

export const crearClase= async (req, res) => {
    try{
        const errors= validationResult(req);
        if(!errors.isEmpty){
            throw new ValidationResultError(validationResultError + errors.array());
        }
        const responseObject = await buscarClase()
    }catch(error){
        return res.status(400).json({
            mensaje: response400,
            errores: error.message
        })
    }}

export const cancelarClases= async (req, res) => {
    throw new NotImplemented("TODO");
}

export const registrarAlumnoAclases= async (req, res) => {
    throw new NotImplemented("TODO");
}

