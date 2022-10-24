import { StorageConnection } from "./storage_connection"

export class CoachStorage{
    constructor(){
        this.storageConnection = new StorageConnection("TrainIt","Coach")
        this.collection = this.storageConnection.getCollection()
    }
    async crearCoach(coach){
        return await this.collection.insertOne(coach)
    }

    async modificarCoach(coach){
        throw new Error("Este endpoint todavia no esta disponible")
    }

    async borrarCoach(coach){
        await this.collection.deleteMany({id : coach.Id})
    }

    async buscarCoach(coach){
        return await this.collection.find({id : coach.Id}).toArray()    
    }

    async buscarCoach(){
        return await this.collection.find({}).toArray()
    }
}