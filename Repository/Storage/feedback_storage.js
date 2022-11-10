import { NotImplemented } from "../../ErrorHandling/NotImplementedApi.js"
import { StorageConnection } from "./storage_connection.js"

export default class FeedbackStorage{
    constructor(){        
        this.storageConnection = new StorageConnection("TrainIt","Feedback");
        this.collection = this.storageConnection.getCollection();
    }

    async crearFeedback(nuevoFeedback) {
        return await this.client.insertOne(nuevoFeedback);
    }

    async darFeedback(dni_atleta, titulo_clase, devolucion, estado_feedback) {
        throw new NotImplemented("Este endpoint todavia no esta disponible")
    }

    async cerrarFeedback(dni_atleta, titulo_clase, estado_feedback) {
        throw new NotImplemented("Este endpoint todavia no esta disponible")
    }

    async borrarFeedback(dni_atleta, titulo_clase) {
        return await this.client.delete( {dni_atleta: dni_atleta, titulo_clase: titulo_clase} );
    }

    async obtenerUnFeedbackPorId(feedbackId) {
        return await this.client.findOne( { id: feedbackId } ).toArray();
    }

    async obtenerUnFeedback(dni_atleta, dni_coach) {
        return await this.client.findOne( { dni_atleta: dni_atleta, dni_coach: dni_coach } ).toArray();
    }

    async obtenerFeedbacks() {
        return await this.client.find();
    }
}