import { NotImplemented } from "../../ErrorHandling/NotImplementedApi.js"
import { StorageConnection } from "./storage_connection.js"

export default class FeedbackStorage{
    constructor(){        
        this.storageConnection = new StorageConnection("TrainIt","Feedback");
        this.collection = this.storageConnection.getCollection();
    }

    async crearFeedback(nuevoFeedback) {
        return await this.collection.insertOne(nuevoFeedback);
    }

    async darFeedback(id_atleta, devolucion, cambioEstado) {
        return await this.collection.updateOne({"_id": id_atleta}, {$set: {"estado": cambioEstado, "feedbackContent": devolucion}})
    }

    async cerrarFeedback(id_atleta, cambioEstado) {
        return await this.collection.updateOne({"_id": id_atleta}, {$set: {"estado": cambioEstado}})
    }

    async borrarFeedback(id) {
        return await this.collection.deleteOne( {_id: id } );
    }

    async obtenerUnFeedbackPorId(feedbackId) {
        return await this.collection.findOne( { id: feedbackId } );
    }

    async obtenerFeedbacksPorAtleta(dni_del_atleta) {
        let el_dni = parseInt(dni_del_atleta)
        return await this.collection.find( { dni_atleta: el_dni } ).toArray();
    }

    async obtenerFeedbacksPorCoach(dni_del_coach) {
        let el_dni = parseInt(dni_del_coach)
        return await this.collection.find( { dni_coach: el_dni } ).toArray();
    }

    async obtenerFeedbacks() {
        return await this.collection.find({}).toArray();
    }

    async obtenerFeedbackEnCurso(dni_del_atleta) {
        let el_dni = parseInt(dni_del_atleta)
        return await this.collection.findOne( { dni_coach: el_dni, estado: {$nin : "closed"} } );
    }

    async obtenerFeedbackPendienteAtleta(dni_del_atleta) {
        let el_dni = parseInt(dni_del_atleta)
        return await this.collection.findOne( { dni_del_atleta: el_dni, estado: "pending" } );
    }

    async obtenerFeedbackCompletadoAtleta(dni_del_atleta) {
        let el_dni = parseInt(dni_del_atleta)
        return await this.collection.findOne( { dni_del_atleta: el_dni, estado: "completed" } );
    }
}