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
        const clases=  await repoClass.buscarTodasLasClases();
    }catch(error){
        if(!error instanceof GenericError()){
            throw new GenericError(error.message);
        }
        throw error;
    }
    return clases;
}





export const buscarClasesPorNombre= async (req) => {
    try{
        
        const clases=  await repoClass.buscarClasesPorNombre(nombreClase);
    }catch(error){
        if(!error instanceof GenericError()){
            throw new GenericError(error.message);
        }
        throw error;
    }
    return clases;
}

export const registrarAlumnoAClase= async (claseId, alumno) => {
    try{
        let clase = this.repoClass.buscarClasesPorId(claseId)
        if(clase != undefined){
          let {alumnos,listaEspera, cupo}= clase;
          if(!alumnos.length > cupo){
                if(!alumnos.includes(alumno)){
                    alumnos.push(alumno)
                    return this.repoClass.actualizarAlumnosDeClase(claseId,alumnos)
                }
          }else{
            if(!listaEspera.includes(alumno)){
                listaEspera.push(alumno)
                return this.repoClass.actualizarListaDeEspera(claseId, listaEspera)
            }
          }
        }
    } catch (error) {
        if(!error instanceof GenericError()){
            throw new GenericError(error.message);
        }
        throw error;
    }
}

export const darBajaAtleta= async (claseId, atleta) => {
    try{
        let clase = this.repoClass.buscarClasesPorId(claseId)
        if(clase != undefined){
          let {alumnos,listaEspera, cupo}= clase;
          if(alumnos.includes(atleta)){
            alumnos.filter(alumno => alumno._id != atleta._id);
            if(listaEspera.length>0){
                alumn= listaEspera.shift();
                alumnos.push(alumn);
            }
            return this.repoClass.actualizarAlumnosDeClase(claseId,alumnos)
          }
        }
    } catch (error) {
        if(!error instanceof GenericError()){
            throw new GenericError(error.message);
        }
        throw error;
    }
}

export const crearClase= async (titulo, cupo, ubicacion, diaActividad, coachId) => {
    try {
        const verificador= this.buscarClasePorCoachYFecha;
        if(verificador =! undefined){
            coach = this.repoCoach.buscarUnCoach(coachId);
            const {_id}= this.repoClass.crearClase(new Clase(titulo,cupo,ubicacion,diaActividad,coach));
        return _id;
        }
    } catch (error) {
        if(!error instanceof GenericError()){
            throw new GenericError(error.message);
        }
        throw error;
    }
    
}

export const cancelarClase= async (claseId, coach)=>{
    try {
        if(coach.rol.descripcionRol() !== "Entrenador") {
            throw new Error("Solamente los entrenadores pueden modificar clases")
        }
        response= this.repoClass.cancelarClase(claseId);
    } catch (error) {
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

const buscarClasePorCoachYFecha= async(coach, fecha) =>{
    try{
        const clases=  await repoClass.buscarClasesPorCoachYFecha(coach,fecha);
    }catch(error){
        if(!error instanceof GenericError()){
            throw new GenericError(error.message);
        }
        throw error;
    }
    return clases;
}