import { NotImplemented } from "../../ErrorHandling/NotImplementedApi.js"
import { StorageConnection } from "./storage_connection.js"

export default class FeedbackStorage{
    constructor(){        
        this.storageConnection = new StorageConnection("TrainIt","Feedback");
        this.collection = this.storageConnection.getCollection();
    }

    async crearFeedback(feedback) {
        return await this.client.insertOne(feedback);
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

    async buscarFeedback(dni_atleta, titulo_clase) {
        return await this.client.findOne( {dni_atleta: dni_atleta, titulo_clase: titulo_clase} ).toArray();
    }

    async obtenerFeedbacks() {
        return await this.client.find();
    }
}