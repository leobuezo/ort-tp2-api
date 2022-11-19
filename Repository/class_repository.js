import { response } from "express"
import { MongoDBCannotFindError, MongoDBCannotInsertError } from "../ErrorHandling/CustomError.js"
import Clase from "../models/training_class.js"
import { cannotFindError, cannotInsertError } from "./helpers/ErrorHelper.js"
import { ClassStorage } from "./Storage/class_storage.js"

export class ClassRepository{
    constructor(){
        this.storage = new ClassStorage()
    }

    buscarTodasLasClases(){
        try{
            clases= this.storage.buscarClases()
        }catch(error){
            throw new MongoDBCannotFindError(cannotFindError + error.message)
        }
        return error;
    }

    buscarClase(clase){
        try{
            verificador= this.storage.buscarClase(clase);
        }catch(error){
            throw new MongoDBCannotFindError(cannotFindError + error.message)
        }
        return error;
    }

    crearClase(clase){
        try {
            response = this.storage.crearClase(clase)   
        } catch (error) {
            throw new MongoDBCannotInsertError(cannotInsertError+ error);
        }
        return response;
    }

    modificarClase(clase,usuario){
        try {
            if (usuario.rol.descripcionRol() !== "Entrenador") {
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
            console.log(error)
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
}