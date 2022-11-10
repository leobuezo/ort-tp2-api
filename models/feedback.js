import { v4 as uuidv4 } from "uuid";

export default class Feedback {
    constructor(dni_atleta, titulo_clase, dni_coach) {
        this._id = uuidv4()
        this.estado = "pending"
        this.dni_atleta = dni_atleta
        this.titulo_clase = titulo_clase
        this.dni_coach = dni_coach
        this.feedbackContent = null
    }

    darFeedback(feedbackContent) {
        if(feedbackContent != undefined || feedbackContent != null) {
            this.feedbackContent = feedbackContent;
            this.estado = "completed";
        }
    }

    cerrarFeedback() {
        if(this.estado == "completed") {
            this.estado = "closed";
        }
    }

}