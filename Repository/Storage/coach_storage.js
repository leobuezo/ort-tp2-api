import { NotImplemented } from "../../ErrorHandling/NotImplementedApi.js"
import { StorageConnection } from "./storage_connection.js"

export class CoachStorage{
    constructor(){
        this.storageConnection = new StorageConnection("TrainIt","Coach")
        this.collection = this.storageConnection.getCollection()
    }
    
    async crearCoach(coach){
        return this.collection.insertOne(coach)
    }

    async modificarCoach(coach){
        throw new NotImplemented("Este endpoint todavia no esta disponible")
    }

    async darFeedback(feedback){
        throw new NotImplemented("Este endpoint todavia no esta disponible")
    }

    async borrarCoach(coach){
        await this.collection.deleteMany({id : coach.Id})
    }

    async buscarUnCoach(dni){
        return await this.collection.find({dni : dni}).toArray()    
    }

    async buscarCoach(){
        return await this.collection.find({}).toArray()
    }

    async crearClase(clase){
        throw new NotImplemented("Este endpoint todavia no esta implemtado")
    }
}