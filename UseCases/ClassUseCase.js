import { response } from "express";
import Clase from "../models/training_class.js"
import { GenericError, InvalidProperty, notAuthorizedError, NotImplemented, } from "../ErrorHandling/CustomError.js";
import { ClassRepository } from "../Repository/class_repository.js";
import { cannotUpdateError, InvalidPropertyError, notAuthorized, notAuthorizedTitle, usaCaseError } from "../Repository/helpers/ErrorHelper.js";
import { CoachRepository } from "../Repository/coach_repository.js";

const repoClass= new ClassRepository();
const repoCoach= new CoachRepository();

export const buscarClases= async () => {
    try{
        const clases= await repoClass.buscarTodasLasClases();
        console.log(clases);
        return clases;
    }catch(error){
        if(!error instanceof GenericError){
            throw new GenericError(error.message);
        }
        throw error;
    }
}





export const buscarClasesPorNombre= async (nombreClase) => {
    try{
        verificador(nombreClase);
        const clases=  await repoClass.buscarClasesPorNombre(nombreClase);
    }catch(error){
        if(!error instanceof GenericError()){
            throw new GenericError(error.message);
        }
        throw error;
    }
    return clases;
}

export const registrarAlumnoAClase= async (claseId, atletaId) => {
    try{
        let clase = await repoClass.buscarAlumnoEnClase(claseId,atletaId);
        console.log(clase);
        if(clase.length == 0){
            clase= await repoClass.buscarClasesPorId(claseId);
            console.log(clase);
            let {alumnos, cupo}= clase[0];  
            let result;
            if(alumnos.length < cupo){
                result= await repoClass.ingresarAtletaEnClase(claseId,atletaId);
            }else{
                result = await repoClass.agregarAListaDeEspera(claseId,atletaId);
            }
            return result.acknowledged;
          } 
    }catch (error) {
        if(!error instanceof GenericError){
            throw new GenericError(error.message);
        }
        throw error;
    }
}

export const darBajaAtleta= async (claseId, atletaId) => {
    try{
        let clase = await repoClass.buscarAlumnoEnClase(claseId,atletaId);
        console.log(clase);
        if(clase.length > 0){
            const bajaClase= await repoClass.darBajadeClase(claseId,atletaId);
            console.log(bajaClase);
            const {listaEspera}= clase;
            if(listaEspera.length > 0){
                alumnoId= listaEspera.shift();
                await repoClass.darBajadelistaDeEsperaClase(alumnoId);
                await repoClass.ingresarAtletaEnClase(alumnoId);
            }
            return bajaClase.acknowledged
        }
    } catch (error) {
        if(!error instanceof GenericError){
            throw new GenericError(error.message);
        }
        throw error;
    }
}

export const crearClase= async (titulo, cupo, ubicacion, diaActividad, coachId) => {
    try {
       console.log("voy a buscar la clase")
        console.log(coachId)
        console.log("voy a crear la clase")
        const clase= new Clase(titulo,cupo,ubicacion,diaActividad,coachId);
        console.log(clase);
        const {insertedId:_id}= await repoClass.agregarClase(clase);
        console.log(_id);
        return _id;    
    } catch (error) {
        if(!error instanceof GenericError){
            throw new GenericError("useCase"+error.message);
        }
        throw error;
    }
    
}

export const cancelarClase= async (claseId)=>{
    try {
        return await repoClass.cancelarClase(claseId);       
    }catch (error) {
        if(!error instanceof GenericError()){
            throw new GenericError(error.message,cannotUpdateError);
        }
        throw error;
    }
}

const verificador = (param) => {
    if(param == null && param == undefined && param == ""){
        throw new InvalidProperty(InvalidPropertyError + param,invalidParam,400);
    }
}

const buscarClasePorCoachYFecha= async(coachId, fecha) =>{
    try{
        verificador(fecha);
        verificador(coachId);
        const clases=  await repoClass.buscarClasesPorCoachYFecha(coachId,fecha);
    }catch(error){
        if(!error instanceof GenericError()){
            throw new GenericError(error.message);
        }
        throw error;
    }
    return clases;
}