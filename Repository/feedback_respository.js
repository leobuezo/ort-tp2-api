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

    darFeedback(id_atleta, devolucion, cambioEstado) {
        let feedback = null;
        try {
            console.log(`
            _id: ${id_atleta}
            devolucion: ${devolucion}
            estado: ${cambioEstado}
            `)
            feedback = this.storage.darFeedback(id_atleta, devolucion, cambioEstado);
        } catch(error) {
            console.log(error);
        }
        return feedback;
    }

    cerrarFeedback(id_atleta, cambioEstado) {
        let feedback = null;
        try {
            console.log(`
            _id: ${id_atleta}
            estado: ${cambioEstado}
            `)
            feedback = this.storage.cerrarFeedback(id_atleta, cambioEstado);
        } catch(error) {
            console.log(error);
        }
        return feedback;
    }

    borrarFeedback(id) {
        let feedback = null;
        try {
            feedback = this.storage.borrarFeedback(id);
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

    async obtenerUnFeedbackPorAtleta(dni_atleta) {
        let feedback = null;
        try {
            feedback = await this.storage.obtenerUnFeedbackPorAtleta(dni_atleta);
        } catch(error) {
            console.log(error);
        }
        return feedback;        
    }

    obtenerUnFeedbackPorCoach(dni_coach) {
        let feedback = null;
        try {
            feedback = this.storage.obtenerUnFeedbackPorCoach(dni_coach);
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