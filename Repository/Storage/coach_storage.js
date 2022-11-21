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

    async modificarCoach(id, coachAModificar){
        
        return await this.collection.updateOne(
            { googleId : id },
            { $set : 
                {
                    nombre : coachAModificar.nombreTemp,
                    apellido : coachAModificar.apellidoTemp,
                    fechaNacimiento : coachAModificar.fechaNacimientoTemp,
                    dni : coachAModificar.dniTemp,
                }
            }
        )
    }

    async borrarCoach(googleId){
        await this.collection.updateOne(
            {googleId : googleId},
            {$set : 
                {
                    team: null,   
                }
            }
        )
    }

    async buscarUnCoach(googleId){
        return this.collection.find({ googleId: googleId }).toArray()   
    }

    async buscarCoachPorTeam(googleId, team) {
        return await this.collection.find({
            googleId: googleId,
            team: team
        }).toArray()
    }

    async registrarCoachAlTeam(googleId, team) {
        return await this.collection.updateOne(
            {googleId: googleId}, 
            {
            $set: {
                team: team
            }
        })
    }

    async buscarCoachPorDni(dni){
        return this.collection.find({ dni : dni}).toArray()
    }

    async buscarCoach(){
        return await this.collection.find({}).toArray()
    }

}