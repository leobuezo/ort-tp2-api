import {StorageConnection}  from "./storage_connection.js";

export class TeamStorage{
    constructor(){
        this.storageRepository = new StorageConnection("TrainIt", "Team")
        this.collection = this.storageRepository.getCollection()
    }

    async buscarAtletaPorTeam(googleId){
        console.log(googleId)
        return await this.collection.find({
            googleId : id
        }).toArray()    
    }

    //async buscarCoachPorTeam()

    async agregarTeam(team){
        return await this.collection.insertOne(team)
    }
}