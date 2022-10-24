import { StorageConnection } from "./storage_connection"

export class AthleteStorage{
    constructor(){
        this.storageConnection = new StorageConnection("TrainIt","Athlete")
        this.collection = this.storageConnection.getCollection()
    }

    async crearAtleta(atleta){
        return await this.collection.insertOne(atleta)
    }

    async modificarAtleta(){
        throw new Error("Este endpoint todavia no esta disponible")
    }

    async borrarAtleta(atleta){
        await this.collection.deleteMany({id : atleta.id})
    }

    async buscarAtleta(atleta){
        return await this.collection.find({id : atleta.id}).toArray()
    }

    async buscarAtleta(){
        return await this.collection.find({}).toArray()
    }
}