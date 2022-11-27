import { validationResult } from "express-validator";
import { GenericError, NotImplemented } from "../ErrorHandling/CustomError.js";
import { ClassRepository } from "../Repository/class_repository.js";
import { recordsNotFound, response500, validationResultError } from "../Repository/helpers/ErrorHelper.js";
import { cantCreateMessage, cantModifyMessage } from "../Repository/helpers/main.js"
import { crearClase, buscarClases, buscarClasesPorNombre, registrarAlumnoAClase, cancelarClase, darBajaAtleta } from "../UseCases/ClassUseCase.js";


const validarRequest = (req) => {
    console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty) {
        throw new ValidationResultError(validationResultError + errors.array());
    }
}

export const obtenerClases = async (req, res) => {
    try {
        const responseObject = await buscarClases();
        res.status(200).json(responseObject);
        //responseObject.length > 0 ? res.status(200).json(responseObject) : res.status(404).json({ message: "No hay clases registradas" });    
    } catch (error) {
        if (error instanceof GenericError) {
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


export const obtenerClasesPorNombre = async (req, res) => {
    try {
        this.validarRequest(req);
        const { nombre } = req.param;
        const responseObject = await buscarClasesPorNombre(nombre);
        responseObject.length > 0 ? res.status(200).json(responseObject) : res.status(204).json({ message: recordsNotFound });
    } catch (error) {
        if (error instanceof GenericError) {
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

export const crearNuevaClase = async (req, res) => {
    try {
        //this.validarRequest(req)
        console.log(req.body);
        const { titulo, cupo, ubicacion, diaActividad, coachId } = req.body;
        const fecha = new Date(diaActividad);
        const responseObject = await crearClase(titulo, cupo, ubicacion, fecha, coachId);
        res.status(201).json(responseObject);
        //responseObject =! false ? res.status(200).json(responseObject) : res.status(204).json({ message: cantCreateMessage });    
    } catch (error) {
        if (error instanceof GenericError) {
            return res.status(500).json({
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


export const cancelarClases = async (req, res) => {
    try {
        //this.validarRequest(req);
        const { claseId } = req.body;
        const responseObject = await cancelarClase(claseId);
        responseObject.modifiedCount == 1 ? res.status(200).json(responseObject) : res.status(204).json({ message: cantCreateMessage });
    } catch (error) {
        if (error instanceof GenericError) {
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


export const registrarAlumnoAclases = async (req, res) => {
    try {
        //this.validarRequest(req)
        const { claseId, alumnoId } = req.body
        const responseObject = await registrarAlumnoAClase(claseId, alumnoId);
        responseObject == true ? res.status(200).json(responseObject) : res.status(204).json({ message: cantModifyMessage });
    } catch (error) {
        if (error instanceof GenericError) {
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

export const bajaDeAtleta = async (req, res) => {
    try {
        //this.validarRequest(req)
        const { claseId, atletaId } = req.body;
        const responseObject = await darBajaAtleta(claseId, atletaId);
        responseObject == true ? res.status(200).json(responseObject) : res.status(204).json({ message: cantModifyMessage });
    } catch (error) {
        if (error instanceof GenericError) {
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

export const buscarPorId =async  (req,res) => {
    const googleId = req.params.googleId
    const repo = new ClassRepository()
    const clases = await repo.buscarPorGoogleId(googleId)
    return res.status(200).json(clases)
}