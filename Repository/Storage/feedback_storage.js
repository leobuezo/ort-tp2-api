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

    async darFeedback(dni_atleta, devolucion) {
        throw new NotImplemented("Este endpoint todavia no esta disponible")
    }

    async cerrarFeedback(dni_atleta) {
        throw new NotImplemented("Este endpoint todavia no esta disponible")
    }

    async borrarFeedback(dni_atleta, titulo_clase) {
        return await this.collection.delete( {dni_atleta: dni_atleta, titulo_clase: titulo_clase} );
    }

    async obtenerUnFeedbackPorId(feedbackId) {
        return await this.collection.findOne( { id: feedbackId } );
    }

    async obtenerUnFeedback(dni_del_atleta) {
        let el_dni = parseInt(dni_del_atleta)
        return await this.collection.findOne( { dni_atleta: el_dni } );
    }

    async obtenerFeedbacks() {
        return await this.collection.find({}).toArray();
    }
}