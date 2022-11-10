import FeedbackStorage from "./Storage/feedback_storage.js";

export default class FeedbackRepository {
    constructor() {
        this.storage = new FeedbackStorage()
    }

    crearFeedback(nuevoFeedback) {
        let feedback = null;
        try {
            feedback = this.storage.crearFeedback(nuevoFeedback);
        } catch(error) {
            console.log(error);
        }
        return feedback;
    }

    darFeedback(dni_atleta, devolucion) {
        let feedback = null;
        try {
            feedback = this.storage.darFeedback(dni_atleta, devolucion);
        } catch(error) {
            console.log(error);
        }
        return feedback;
    }

    cerrarFeedback(dni_atleta) {
        let feedback = null;
        try {
            feedback = this.storage.cerrarFeedback(dni_atleta);
        } catch(error) {
            console.log(error);
        }
        return feedback;
    }

    borrarFeedback(dni_atleta, titulo_clase) {
        let feedback = null;
        try {
            feedback = this.storage.borrarFeedback(dni_atleta, titulo_clase);
        } catch(error) {
            console.log(error);
        }
        return feedback;
    }

    obtenerUnFeedbackPorId(feedbackId) {
        let feedback = null;
        try {
            feedback = this.storage.obtenerUnFeedbackPorId(feedbackId);
        } catch(error) {
            console.log(error);
        }
        return feedback;        
    }

    obtenerUnFeedback(dni_atleta) {
        let feedback = null;
        try {
            feedback = this.storage.obtenerUnFeedback(dni_atleta);
        } catch(error) {
            console.log(error);
        }
        return feedback;        
    }

    obtenerFeedbacks() {
        let feedback = null;
        try {
            feedback = this.storage.obtenerFeedbacks();
        } catch(error) {
            console.log(error);
        }
        return feedback;                
    }
}