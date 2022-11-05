export default class Feedback {
    constructor(dni_atleta, titulo_clase, dni_coach) {
        this._id = generateUUID()
        this.estado = this.feedbackState.pending
        this.dni_atleta = dni_atleta
        this.titulo_clase = titulo_clase
        this.dni_coach = dni_coach
        this.devolucion = ""
    }

    feedbackState = {
        pending: "pending",
        completed: "completed",
        closed: "closed"
    }

    generateUUID() {
        return uuidv4()
    }

    darFeedback(feedbackContent) {
        if(feedbackContent != undefined || feedbackContent != null) {
            this.feedbackContent = feedbackContent;
            this.state = this.feedbackState.completed;
        }
    }

    cerrarFeedback() {
        if(this.state == this.feedbackState.completed) {
            this.state = this.feedbackState.closed;
        }
    }

}