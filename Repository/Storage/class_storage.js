import { NotImplemented } from "../../ErrorHandling/NotImplementedApi.js"
import { StorageConnection } from "./storage_connection.js"

export class ClassStorage{
    constructor(){        
        this.storageConnection = new StorageConnection("TrainIt","Class")
        this.collection = this.storageConnection.getCollection()
    }

    async buscarClases(){
        return await this.collection.find({}).toArray()
    }

    async buscarClasePorId(claseId){
        return await this.collection.find({id : claseId}).toArray()
    }

    async buscarClasePorNombre(nombreClase){
        return await this.collection.find({id : nombreClase}).toArray()
    }

    async buscarClasePorFecha(fecha){
        return await this.collection.find( {diaActividad : fecha}).toArray()
    }
    
    async buscarClasePorCoachYFecha(coach, fecha){
        return await this.collection.find( {diaActividad : fecha,
                                        coach:{googleId: coach.googleId}}).toArray()
    }

    async agregarClase(clase){
        return await this.collection.insertOne(clase)
    }

    async cancelarClase(claseId){
        return await this.collection.updateOne(
            { _id : claseId},
            { $set : 
                {
                   esCancelada: true
                }
            }
        )    
    }

    async actualizarAtletasAsistentes(claseId,alumnos){
        return await this.collection.updateOne(
            { _id : claseId},
            { $set : 
                {
                    alumnos: alumnos
                }
            }
        )    
    }

    async actualizarListaEspera(claseId,listaEspera){
        return await this.collection.updateOne(
            { _id : claseId},
            { $set : 
                {
                    listaEspera: listaEspera
                }
            }
        )    
    }
    async borrarClase(clase){
        this.collection.deleteMany({ id : clase.Id})
    }
}