import {StorageConnection}  from "./storage_connection.js";

export class TeamStorage{
    constructor(){
        this.storageRepository = new StorageConnection("TrainIt", "Team")
        this.collection = this.storageRepository.getCollection()
    }

    async buscarAtletaPorTeam(id, codigoTeam){
        console.log(id, codigoTeam)
        return await this.collection.find({
            googleId : id,
            team : codigoTeam
        }).toArray()    
    }

    async agregarTeam(team){
        return await this.collection.insertOne(team)
    }
}