
import {CoachRepository} from "../Repository/coach_repository.js"

const repo = new CoachRepository()

export const validateCoach = () => {
    const coach = repositorio.buscarAdmin(dni)
    if (coach.length > 0) {
        return Promise.reject(`Ya existe un coach registrado con el dni ${dni}`)
    }
}
