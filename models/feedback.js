export default class Feedback {
    constructor(dni_atleta, titulo_clase, dni_coach) {
        this.id = 'qwerty99991'//generateUUID()
        this.estado = this.feedbackState.pending
        this.dni_atleta = dni_atleta
        this.titulo_clase = titulo_clase
        this.dni_coach = dni_coach
        this.feedbackContent = null
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
            this.estado = this.feedbackState.completed;
        }
    }

    cerrarFeedback() {
        if(this.estado == this.feedbackState.completed) {
            this.estado = this.feedbackState.closed;
        }
    }

}