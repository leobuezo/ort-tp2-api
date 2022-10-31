import { NotImplemented } from "../../ErrorHandling/NotImplementedApi.js"
import { StorageConnection } from "./storage_connection.js"

export class AthleteStorage{
    constructor(){
        this.storageConnection = new StorageConnection("TrainIt", "Athlete")
        this.collection = this.storageConnection.getCollection()
    }

    async crearAtleta(atleta){
        return this.collection.insertOne(atleta)
    }

    async modificarAtleta(){
        throw new NotImplemented("Este endpoint todavia no esta disponible")
    }

    async darFeedback(feedback){
        throw new NotImplemented("Este endpoint todavia no esta disponible")
    }

    async borrarAtleta(dni){
        await this.collection.deleteOne({dni : dni})
    }

    async buscarUnAtleta(dni){
        return this.collection.find( {dni : dni} ).toArray()
    }

    async buscarAtleta(){
        return this.collection.find({}).toArray()
    }

}