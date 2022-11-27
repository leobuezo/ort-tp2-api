import { response } from "express"
import { MongoDBCannotFindError, MongoDBInstanceInsertError,MongoDBInstanceUpdateError } from "../ErrorHandling/CustomError.js"
import { cannotFindError, cannotInsertError } from "./helpers/ErrorHelper.js"
import { ClassStorage } from "./Storage/class_storage.js"

export class ClassRepository{
    constructor(){
        this.storage = new ClassStorage()
    }

    buscarTodasLasClases(){
        try{
            console.log("buscar en repository")
            return this.storage.buscarClases();
        }catch(error){
            throw new MongoDBCannotFindError(error.message, cannotFindError);
        }
    }

    buscarClasesPorNombre(nombreClase){
        try{
            return this.storage.buscarClase(nombreClase);
        }catch(error){
            throw new MongoDBCannotFindError(error.message, cannotFindError)
        }
    }

    buscarClasesPorId(claseId){
        try{
            return this.storage.buscarClasePorId(claseId);
        }catch(error){
            throw new MongoDBCannotFindError(error.message, cannotFindError)
        }
    }
    


    buscarClasesPorFecha(fechaClase){
        try{
            return this.storage.buscarClase(fechaClase);
        }catch(error){
            throw new MongoDBCannotFindError(error.message, cannotFindError)
        }

    }

    agregarClase(clase){
        try {
            return  this.storage.agregarClase(clase)   
        } catch (error) {
            throw new MongoDBInstanceInsertError(error.message, cannotInsertError);
        }
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


    cancelarClase(claseId){
        try {
            return this.storage.cancelarClase(claseId) 
        } catch (error) {
            throw new MongoDBInstanceUpdateError(error.message)
        }
    }

    borrarClase(clase,usuario){
        try{
            return  this.storage.borrarClase(clase)      
        }catch (error) {
            console.log(error)
        }
    }

    ingresarAtletaEnClase(claseId,atletaId){
        try {
            return this.storage.ingresarAtletaAListaAlumnos(claseId,atletaId); 
        } catch (error) {
            throw new MongoDBInstanceUpdateError(error.message)
        }
    }

    darBajadeClase(claseId, alumnos){
        try {
            return this.storage.sacarAtletaDeListaAlumnos(claseId,alumnos)
        } catch (error) {
            throw new MongoDBInstanceUpdateError(error.message)
        }
    }

    darBajadelistaDeEsperaClase(claseId, listaEspera){
        try {
            return this.storage.sacarAtletaDeListaEspera(claseId,listaEspera)
        } catch (error) {
            throw new MongoDBInstanceUpdateError(error.message)
        }
    }

    agregarAListaDeEspera(claseId,atletaId){
        try {
            return this.storage.ingresarAtletaAListaEspera(claseId,atletaId); 
        } catch (error) {
            throw new MongoDBInstanceUpdateError(error.message)
        }
    }

    buscarClasesPorCoachIdYFecha(coachId,fecha){
        try{
            return this.storage.buscarClasePorCoachIdYFecha(coachId,fechaClase);
        }catch(error){
            throw new MongoDBCannotFindError(error.message, cannotFindError)
        }
    }

    buscarAlumnoEnClase(claseId, atletaId){
        try{
            return this.storage.buscarAlumnoEnClase(claseId, atletaId)
        }catch(error){
            throw new MongoDBCannotFindError(error.message, cannotFindError)
        }
    }

    buscarAlumnoEnListaEspera(claseId, alumnoId){
        try{
            return this.storage.buscarAlumnoEnListaEspera(claseId, alumnoId)
        }catch(error){
            throw new MongoDBCannotFindError(error.message, cannotFindError)
        }
    }
    buscarPorGoogleId(id){
        return this.storage.buscarPorGoogleId(id)
    }
}