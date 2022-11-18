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

    async buscarAtleta() {
        return this.collection.find({}).toArray()
    }

    async agregarTeam(identificador, equipo) {
        return await this.collection.updateOne({
            googleId: identificador
        }, {
            $set: {
                team: equipo
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

    async buscarAtletaPorTeam(googleId, codigoTeam) {
        return await this.collection.find({
            googleId: googleId,
            team: codigoTeam
        }).toArray()
    }

    async darseDeBaja(googleId) {
        return await this.collection.updateOne({
            googleId: googleId
        }, {
            $set: {
                team: null
            }
        }
        )
    }

    async darseDeBajaClase(googleId, idClase) {
        await this.collection.updateOne(
            { googleId: googleId },
            {
                $pull: { clases: { $in: [idClase] } }
            }
        )
    }

    async unirseAClase(googleId, clase) {

    }
}