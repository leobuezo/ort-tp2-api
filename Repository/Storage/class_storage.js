import { ObjectId } from "mongodb"
import { NotImplemented } from "../../ErrorHandling/NotImplementedApi.js"
import { StorageConnection } from "./storage_connection.js"

export class ClassStorage {
    constructor() {
        this.storageConnection = new StorageConnection("TrainIt", "Class")
        this.collection = this.storageConnection.getCollection()
    }

    async buscarClases() {
        return await this.collection.find({}).toArray()
    }

    async buscarAlumnoEnClase(claseId, atletaId) {
        return await this.collection.find({
            alumnos: { $in: [atletaId] },
            _id: ObjectId(claseId)
        }).toArray()
    }

    async buscarAlumnoEnListaEspera(claseId, alumnoId) {
        return await this.collection.find({ $and: [{ _id: ObjectId(claseId) }, { listaEspera: { $in: [alumnoId] } }] }).toArray()
    }

    async buscarClasePorId(claseId) {
        return await this.collection.find({ _id: ObjectId(claseId) }).toArray()
    }

    async buscarClasePorNombre(nombreClase) {
        return await this.collection.find({ titulo: nombreClase }).toArray()
    }

    async buscarClasePorFecha(fecha) {
        return await this.collection.find({ diaActividad: fecha }).toArray()
    }

    async buscarClasePorCoachIdYFecha(coachId, fecha) {
        return await this.collection.find({
            diaActividad: fecha,
            coachId: coachId
        }).toArray()
    }

    async agregarClase(clase) {
        return this.collection.insertOne(clase)
    }

    async cancelarClase(claseId) {
        return await this.collection.updateOne(
            { _id: ObjectId(claseId) },
            {
                $set:
                {
                    esCancelada: true
                }
            }
        )
    }

    async sacarAtletaDeListaAlumnos(claseId, alumnos) {
        return await this.collection.updateOne(
            { _id: ObjectId(claseId) },
            {
                $set:
                {
                    alumnos: alumnos
                }
            }
        )
    }

    async ingresarAtletaAListaAlumnos(claseId, atletaId) {
        return await this.collection.updateOne(
            { _id: ObjectId(claseId) },
            {
                $push:
                {
                    alumnos: { atletaId }
                }
            }
        )
    }

    async sacarAtletaDeListaEspera(claseId, listaEspera) {
        return await this.collection.updateOne(
            { _id: ObjectId(claseId) },
            {
                $set:
                {
                    listaEspera: listaEspera
                }
            }
        )
    }

    async ingresarAtletaAListaEspera(claseId, atletaId) {
        return await this.collection.updateOne(
            { _id: ObjectId(claseId) },
            {
                $push:
                {
                    listaEspera: { atletaId }
                }
            }
        )
    }


    async borrarClase(clase) {
        this.collection.deleteMany({ id: clase.Id })
    }

    async buscarPorGoogleId(id) {
        return await this.collection.find({
            alumnos: { $elemMatch: { atletaId: id } }
        }).toArray()
    }
}