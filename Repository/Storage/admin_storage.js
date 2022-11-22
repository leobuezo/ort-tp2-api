import {StorageConnection}  from "./storage_connection.js";

export class AdminStorage{
    constructor(){
        this.storageRepository = new StorageConnection("TrainIt", "Admin")
        this.storageRepositoryAthlete = new StorageConnection("TrainIt", "Athlete")
        this.collectionAthlete = this.storageRepositoryAthlete.getCollection()
        this.collection = this.storageRepository.getCollection()
    }

    async crearAdmin(admin){
        //Cuando me da la opcion de crear una cuenta, me deberia pedir crear un team o crear una cuenta normal
        return await this.collection.insertOne(admin)
    }

    async buscarTodos(){
        //Cuando me da la opcion de crear una cuenta, me deberia pedir crear un team o crear una cuenta normal
        return await this.collection.find({}).toArray()
    }
}