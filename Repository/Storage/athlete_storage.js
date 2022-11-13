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

    async modificarAtleta(id,objectToModify) {
        //throw new NotImplemented("Este endpoint todavia no esta disponible")

        /* objectToModify contiente: 
        nombreTemp
        apellidoTemp 
        dniTemp 
        edadTemp
        rolTemp */

        return await this.collection.updateOne(
            { googleId : id },
            { $set : 
                {
                    nombre : objectToModify.nombreTemp,
                    apellido : objectToModify.apellidoTemp,
                    dni : objectToModify.dniTemp, 
                    edad : objectToModify.edadTemp,
                    aptoFisico : objectToModify.aptoFisicoTemp,
                    rol : objectToModify.rolTemp,
                    datosValidados: true
                }
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

        const {googleId} = atleta
        
        let obj = await this.collection.find({
            googleId: googleId})
            .toArray()

        let newUser = false 
        if (obj.length === 0) {
            await this.collection.insertOne(atleta)
            newUser = true
            obj = await this.collection.find({
                googleId: googleId})
                .toArray()
        }

        const usuario = JSON.parse(JSON.stringify(obj[0]))
        
        return {usuario, newUser}
    }

}