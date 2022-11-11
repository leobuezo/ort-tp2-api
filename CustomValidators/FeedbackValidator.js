import FeedbackRepository from "../Repository/feedback_respository.js"

const repositorio = new FeedbackRepository()

export const feedbackExists = async (id) => {

    const team = await repositorio.obtenerUnFeedbackPorId(id)

    if (team.lenght === 0) {
        return Promise.reject(`El feedback enviado no existe`)
    }
}