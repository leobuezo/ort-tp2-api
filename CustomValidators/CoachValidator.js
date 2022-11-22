
import {CoachRepository} from "../Repository/coach_repository.js"

const repositorioCoach = new CoachRepository()

export const validateCoach = async dni => {

    return repositorioCoach.buscarCoachPorDni(dni).then(coach => {
        console.log('muestro coach: ', coach.length)
        if (coach.length === 0) {
            return Promise.reject(`No existe un coach registrado con el dni ${dni}`)
        }    
    })
}

export const userCoachExists = googleId => {

    return repositorioCoach.buscarUnCoach(googleId).then(usuario => {
        if (usuario.length === 0) {
            return Promise.reject(`El usuario enviado no existe`)
        }
    })

}