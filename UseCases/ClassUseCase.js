import { response } from "express";
import { GenericError, InvalidProperty, NotImplemented, } from "../ErrorHandling/CustomError.js";
import { ClassRepository } from "../Repository/class_repository.js";
import { cannotUpdateError, InvalidPropertyError, notAuthorized, notAuthorizedTitle, usaCaseError } from "../Repository/helpers/ErrorHelper.js";

const repositorio= new ClassRepository();

export const buscarClases= async () => {
    try{
        const clases=  await repositorio.buscarTodasLasClases();
    }catch(error){
        if(!error instanceof GenericError()){
            throw new GenericError(error.message);
        }
    }
    return clases;
}

export const buscarClasesPorNombre= async (req) => {
    try{
        
        const clases=  await repositorio.buscarClasesPorNombre(nombreClase);
    }catch(error){
        if(!error instanceof GenericError()){
            throw new GenericError(error.message);
        }
    }
    return clases;
}

export const registrarAlumnoAClase= async (alumno) => {
    throw new NotImplemented("clase no implementada", "metodo en desarrollo", 501);

}

export const crearClase= async (titulo, cupo, ubicacion, diaActividad, coachId) => {
    try {

        const {acknowledge}= this.repositorio.crearClase(clase);
        return acknowledge;
    } catch (error) {
        if(!error instanceof GenericError()){
            throw new GenericError(error.message);
        }
    }
    
}

export const cancelarClase= async (claseId, coach)=>{
    try {
        if(coach.rol.descripcionRol() !== "Entrenador") {
            throw new Error("Solamente los entrenadores pueden modificar clases")
        }
        response= this.repositorio.cancelarClase(claseId);
    } catch (error) {
        if(!error instanceof GenericError()){
            throw new GenericError(error.message,cannotUpdateError);
        }
    }
}

const verificador = (param) => {
    if(param == null && param == undefined && param == ""){
        throw new InvalidProperty(InvalidPropertyError,invalidParam,400);
    }}

const verificadorCoach= (coach) => {
    if (coach.rol.descripcionRol() !== "Entrenador") {
        throw new Error(notAuthorized,notAuthorizedTitle,401)
    }
}


const buscarClasePorCoachYFecha= async(coach, fecha) =>{
    try{
        const clases=  await repositorio.buscarClasesPorCoachYFecha(coach,fecha);
    }catch(error){
        if(!error instanceof GenericError()){
            throw new GenericError(error.message);
        }
    }
    return clases;
}