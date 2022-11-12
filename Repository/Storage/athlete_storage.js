import { NotImplemented } from "../../ErrorHandling/NotImplementedApi.js"
import { StorageConnection } from "./storage_connection.js"

export class AthleteStorage {
    constructor() {
        this.storageConnection = new StorageConnection("TrainIt", "Athlete")
        this.collection = this.storageConnection.getCollection()
    }

    async crearAtleta(atleta) {
        return this.collection.insertOne(atleta)
    }

    async modificarAtleta(id,dni,edad) {
        //throw new NotImplemented("Este endpoint todavia no esta disponible")
        return await this.collection.updateOne(
            { googleId : id },
            { $set : {
                 dni : dni, edad : edad }
            }
        )
    }

    async darFeedback(feedback) {
        throw new NotImplemented("Este endpoint todavia no esta disponible")
    }

    async borrarAtleta(googleId) {
        await this.collection.deleteOne({ googleId: googleId })
    }

    async buscarUnAtleta(googleId) {
        return this.collection.find({
            googleId: googleId
        }).toArray()
    }

    async buscarAtleta() {
        return this.collection.find({}).toArray()
    }

    async agregarTeam(identificador, equipo) {
        return await this.collection.updateOne({
            dni: identificador
        }, {
            $set: {
                team: equipo
            }
        })
    }

    async buscarOAgregar(atleta){
        let usuario = await this.collection.findOne({googleId : atleta.googleId})
        let newUser = false 
        if (!usuario) {
            await this.collection.insertOne(atleta)
            newUser = true
            usuario = await this.collection.findOne({googleId : atleta.googleId})
        }
        return {usuario, newUser}
    }

}