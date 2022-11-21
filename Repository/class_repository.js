import { response } from "express"
import { MongoDBCannotFindError, MongoDBCannotInsertError,MongoDBInstanceUpdateError } from "../ErrorHandling/CustomError.js"
import Clase from "../models/training_class.js"
import { cannotFindError, cannotInsertError } from "./helpers/ErrorHelper.js"
import { ClassStorage } from "./Storage/class_storage.js"

export class ClassRepository{
    constructor(){
        this.storage = new ClassStorage()
    }

    buscarTodasLasClases(){
        try{
            response= this.storage.buscarClases()
        }catch(error){
            throw new MongoDBCannotFindError(error.message, cannotFindError)
        }
        return response;
    }

    buscarClasesPorNombre(nombreClase){
        try{
            response= this.storage.buscarClase(nombreClase);
        }catch(error){
            throw new MongoDBCannotFindError(error.message, cannotFindError)
        }
        return response;
    }

    buscarClasesPorFecha(fechaClase){
        try{
            response= this.storage.buscarClase(fechaClase);
        }catch(error){
            throw new MongoDBCannotFindError(error.message, cannotFindError)
        }
        return response;
    }

    agregarClase(clase){
        try {
            response = this.storage.agregarClase(clase)   
        } catch (error) {
            throw new MongoDBCannotInsertError(error.message, cannotInsertError);
        }
        return response;
    }


    modificarClase(clase,coach){
        try {
            if (coach.rol.descripcionRol() !== "Entrenador") {
                throw new Error("Solamente los entrenadores pueden modificar clases")
            } else {
                this.storage.modificarClase(clase)
            }        
        } catch (error) {
            console.log(error)
        }
    }


    cancelarClase(clase){
        try {
            this.storage.cancelarClase(clase) 
        } catch (error) {
            throw new MongoDBInstanceUpdateError(error.message,)
        }
    }

    borrarClase(clase,usuario){
        try {
            if (usuario.Rol !== "Entrenador") {
                throw new Error("Solamente los entrenadores pueden crear clases")
            } else {
                this.storage.borrarClase(clase)
            }        
        } catch (error) {
            console.log(error)
        }
    }

    buscarClasesPorCoachYFecha(coach,fecha){
        try{
            verificador= this.storage.buscarClasePorCoachYFecha(coach,fechaClase);
        }catch(error){
            throw new MongoDBCannotFindError(error.message, cannotFindError)
        }
        return response;
    }
}