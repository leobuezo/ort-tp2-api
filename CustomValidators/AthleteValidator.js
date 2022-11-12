
import { AthleteRepository } from '../Repository/athlete_repository.js'

const repositorio = new AthleteRepository()
export const validateUser = dni => {

    return repositorio.buscarUnAtleta(dni).then(usuario => {
        if (usuario.length > 0) {
            return Promise.reject(`El usuario ${usuario[0].nombre} ${usuario[0].apellido} ya existe`)
        }
    })
}

export const userExists = googleId => {

    return repositorio.buscarUnAtleta(googleId).then(usuario =>{
        if (usuario.length === 0) {
            return Promise.reject(`El usuario enviado no existe`)
        }
    })

}
