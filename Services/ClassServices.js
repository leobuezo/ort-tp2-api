import { NotImplemented } from "../ErrorHandling/CustomError.js";
import{buscarClases} from "../UseCases/ClassUseCase.js";

export const obtenerClases= async (req, res) =>{
    try{
        const responseObject = await buscarClases();
        responseObject.length > 0 ? res.status(200).json(responseObject) : res.status(204).json({ message: "No hay clases registradas" });    
    }catch(error){
        console.error(error)
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: error
        })
    }
}


export const buscarClase= async (req, res) => {
    throw new NotImplemented("TODO");

}

export const crearClases= async (req, res) => {
    throw new NotImplemented("TODO");
}

export const cancelarClases= async (req, res) => {
    throw new NotImplemented("TODO");
}

export const registrarAlumnoAclases= async (req, res) => {
    throw new NotImplemented("TODO");
}

