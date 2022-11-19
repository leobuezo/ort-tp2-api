import { NotImplemented } from "../../ErrorHandling/NotImplementedApi.js"
import { StorageConnection } from "./storage_connection.js"

export class ClassStorage{
    constructor(){        
        this.storageConnection = new StorageConnection("TrainIt","Class")
        this.collection = this.storageConnection.getCollection()
    }

    async buscarClases(){
        return await this.client.find({}).toArray()
    }
    async buscarClase(clase){
        return await this.client.find({id : clase.Id}).toArray()
    }

    async agregarClase(clase){
        return await this.collection.insertOne(clase)
    }

    async modificarClase(clase){
        throw new NotImplemented("Este endpoint todavia no esta disponible")
    }

    async borrarClase(clase){
        this.collection.deleteMany({ id : clase.Id})
    }
}