import { StorageConnection } from "./storage_connection"

export class ClassStorage{
    constructor(){        
        this.storageConnection = new StorageConnection("TrainIt","Class")
        this.collection = this.storageConnection.getCollection()
    }

    async buscarClase(){
        return await this.client.find({}).toArray()
    }
    async buscarClase(clase){
        return await this.client.find({id : clase.Id}).toArray()
    }

    async crearClase(clase){
        return this.collection.insertOne(clase)
    }

    async modificarClase(clase){
        throw new Error("Este endpoint todavia no esta disponible")
    }

    async cancelarClase(clase){
        throw new Error("Este endpoint todavia no esta disponible")
    }

    async borrarClase(clase){
        this.collection.deleteMany({ id : clase.Id})
    }
}