import {StorageConnection}  from "./storage_connection.js";

export class TeamStorage{
    constructor(){
        this.storageRepository = new StorageConnection("TrainIt", "Team")
        this.collection = this.storageRepository.getCollection()
    }

    async buscarAtletaPorTeam(dni, team){
        return await this.collection.find({dni : dni, team : team}).toArray()    
    }
}