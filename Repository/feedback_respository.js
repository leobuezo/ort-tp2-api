import { FeedbackStorage } from "./Storage/feedback_storage.js";
import { Feedback } from "../models/feedback.js";

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

    darFeedback(dni_atleta, titulo_clase, devolucion, estado_feedback) {
        let feedback = null;
        try {
            feedback = this.storage.darFeedback(dni_atleta, titulo_clase, devolucion, estado_feedback);
        } catch(error) {
            console.log(error);
        }
        return feedback;
    }

    cerrarFeedback(dni_atleta, titulo_clase, estado_feedback) {
        let feedback = null;
        try {
            feedback = this.storage.cerrarFeedback(dni_atleta, titulo_clase, estado_feedback);
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

    obtenerUnFeedback(dni_atleta, dni_coach) {
        let feedback = null;
        try {
            feedback = this.storage.obtenerUnFeedback(dni_atleta, dni_coach);
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