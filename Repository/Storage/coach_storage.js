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
        //throw new NotImplemented("Este endpoint todavia no esta disponible")
        return await this.collection.updateOne(
            { googleId : id },
            { $set : 
                {
                    nombre : coachAModificar.nombreTemp,
                    apellido : coachAModificar.apellidoTemp,
                    edad : coachAModificar.edadTemp,
                    dni : coachAModificar.dniTemp,
                    rol : coachAModificar.rolTemp,
                    team: coachAModificar.teamTemp,
                    email: coachAModificar.emailTemp,
                }
            }
        )
    }

    async darFeedback(feedback){
        throw new NotImplemented("Este endpoint todavia no esta disponible")
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

    async buscarCoachPorDni(dni){
        return this.collection.find({ dni : dni}).toArray()
    }

    async buscarCoach(){
        return await this.collection.find({}).toArray()
    }

    async crearClase(clase){
        throw new NotImplemented("Este endpoint todavia no esta implemtado")
    }
}