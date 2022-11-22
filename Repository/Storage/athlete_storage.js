import { ObjectId } from "mongodb"
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

    async modificarAtleta(id, objectToModify) {
        return await this.collection.updateOne(
            { googleId: id },
            {
                $set:
                {
                    nombre: objectToModify.nombreTemp,
                    apellido: objectToModify.apellidoTemp,
                    dni: objectToModify.dniTemp,
                    fechaNacimiento: objectToModify.fechaNacimiento,
                    aptoFisico: objectToModify.aptoFisicoTemp,
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

    async buscarUnAtletaPorDni(dni) {
        return await this.collection.find({
            dni: dni
        }).toArray()
    }

    async buscarAtleta() {
        return this.collection.find({}).toArray()
    }

    async agregarTeam(googleId, team) {
        return await this.collection.updateOne({
            googleId: googleId
        }, {
            $set: {
                team: team
            }
        })
    }

    async buscarOAgregar(atleta) {

        const { googleId } = atleta

        let obj = await this.collection.find({
            googleId: googleId
        })
            .toArray()

        let newUser = false
        if (obj.length === 0) {
            await this.collection.insertOne(atleta)
            newUser = true
            obj = await this.collection.find({
                googleId: googleId
            })
                .toArray()
        }

        const usuario = JSON.parse(JSON.stringify(obj[0]))

        return { usuario, newUser }
    }

    async buscarAtletaPorTeam(googleId, team) {
        return await this.collection.find({
            googleId: googleId,
            team: team
        }).toArray()
    }

    async darseDeBajaClase(googleId, idClase) {
        return await this.collection.updateOne(
            { googleId: googleId },
            {
                $pull: { clases: { idClase } }
            }
        )
    }

    async unirseAClase(googleId, idClase) {
        return await this.collection.updateOne(
            { googleId: googleId },
            {
                $push: { clases: { idClase } }
            }
        )
    }
    async buscarClaseRegistrada(googleId, idClase) {
        return await this.collection.find({ googleId: googleId, clases: { $elemMatch: { idClase: idClase } } }).toArray()
    }

    
}