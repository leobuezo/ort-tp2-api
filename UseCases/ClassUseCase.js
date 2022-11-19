import { response } from "express";
import { ClassRepository } from "../Repository/class_repository.js";
import { usaCaseError } from "../Repository/helpers/ErrorHelper.js";

const repositorio= new ClassRepository();

export const buscarClases= async () => {
    try{
        const clases=  await repositorio.buscarTodasLasClases();
    }catch(error){
        throw new ClassUseCaseError(usaCaseError + error);
    }
    return clases;
}

export const buscarClase= async (clase) => {
    try{
        const clases=  await repositorio.buscarClase(clase);
    }catch(error){
        throw new ClassUseCaseError(usaCaseError + error);
    }
    return clases;
}

export const crearClase= async (clase) => {
    try {
        verificador= repositorio.buscarClase(clase)
        (verificador != null && verificador == undefined && verificador == "") ?   clase= this.storage.crearClase(clase) : clase = undefined
    } catch (error) {
        throw new ClassUseCaseError(usaCaseError + error);
    }
    return clase
}