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

    darFeedback(id_feedback, devolucion, cambioEstado) {
        let feedback = null;
        try {
            console.log(`
            _id: ${id_feedback}
            devolucion: ${devolucion}
            estado: ${cambioEstado}
            `)
            feedback = this.storage.darFeedback(id_feedback, devolucion, cambioEstado);
        } catch(error) {
            console.log(error);
        }
        return feedback;
    }

    cerrarFeedback(id_feedback, cambioEstado) {
        let feedback = null;
        try {
            console.log(`
            _id: ${id_feedback}
            estado: ${cambioEstado}
            `)
            feedback = this.storage.cerrarFeedback(id_feedback, cambioEstado);
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

    async obtenerFeedbacksPorAtleta(dni_atleta) {
        let feedback = null;
        try {
            feedback = await this.storage.obtenerFeedbacksPorAtleta(dni_atleta);
        } catch(error) {
            console.log(error);
        }
        return feedback;        
    }

    obtenerFeedbacksPorCoach(dni_coach) {
        let feedback = null;
        try {
            feedback = this.storage.obtenerFeedbacksPorCoach(dni_coach);
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

    async obtenerFeedbackEnCurso(dni_atleta) {
        let feedback = null;
        try {
            feedback = await this.storage.obtenerFeedbackEnCurso(dni_atleta);
        } catch(error) {
            console.log(error);
        }
        return feedback;        
    }

    async obtenerFeedbackPendienteAtleta(dni_atleta) {
        let feedback = null;
        try {
            feedback = await this.storage.obtenerFeedbackPendienteAtleta(dni_atleta);
        } catch(error) {
            console.log(error);
        }
        return feedback;       
    }

    async obtenerFeedbackCompletadoAtleta(dni_atleta) {
        let feedback = null;
        try {
            feedback = await this.storage.obtenerFeedbackCompletadoAtleta(dni_atleta);
        } catch(error) {
            console.log(error);
        }
        return feedback;       
    }
}