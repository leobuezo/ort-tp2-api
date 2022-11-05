import { FeedbackStorage } from "./Storage/feedback_storage.js";
import { Feedback } from "../models/feedback.js";

export default class FeedbackRepository {
    constructor() {
        this.storage = new FeedbackStorage()
    }

    crearFeedback(dni_atleta, titulo_clase, dni_coach) {
        let feedback = null;
        try {
            feedback = this.storage.crearFeedback( new Feedback(dni_atleta, titulo_clase, dni_coach) );
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

    obtenerUnFeedback(dni_atleta, titulo_clase) {
        let feedback = null;
        try {
            feedback = this.storage.buscarFeedback(dni_atleta, titulo_clase);
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