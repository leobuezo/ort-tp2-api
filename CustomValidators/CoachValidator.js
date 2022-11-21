
import {CoachRepository} from "../Repository/coach_repository.js"

const repositorioCoach = new CoachRepository()

export const validateCoach = () => {
    const coach = repositorioCoach.buscarCoachPorDni(dni)
    if (coach.length > 0) {
        return Promise.reject(`Ya existe un coach registrado con el dni ${dni}`)
    }
}

export const userExists = googleId => {

    return repositorioCoach.buscarUnCoach(googleId).then(usuario => {
        if (usuario.length === 0) {
            return Promise.reject(`El usuario enviado no existe`)
        }
    })

}