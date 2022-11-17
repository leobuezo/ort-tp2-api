import { AthleteRepository } from "../Repository/athlete_repository.js"
import { CoachRepository } from "../Repository/coach_repository.js"
import { crearAlumnoVacio } from "./AthleteUseCases.js"
import { crearCoachVacio } from "./CoachUseCases.js"

const repositorioAthlete = new AthleteRepository()
const repositorioCoach = new CoachRepository()

export const athleteAuthenticationUseCase = async (res, next, data) => {
    const { id, email, error } = data

    //const existe = await repositorioCoach.buscarUnCoach(id)

    if (error !== undefined) {
        return next()
    }
    const defaultUser = crearAlumnoVacio(id,email)
    const { usuario, newUser } = await repositorioAthlete.buscarOAgregar(defaultUser)
        .catch(err => {
            console.log("Error al buscar o registrar al usuario con google", err)
            return res.status(500).json({
                message: "Hubo un error al buscar o registrar al usuario en Train IT. Por favor, reintente mas tarde",

            })
        })

    if (usuario) {
        let responseObject = JSON.parse(JSON.stringify(usuario))
        responseObject['newUser'] = newUser
        return responseObject
    } else {
        return next()
    }
}

export const coachAuthenticationUseCase = async (res, next, data) => {
    const { id, email, error } = data

    // const existe = await repositorioAthlete.buscarUnAthlete(id)

    if (error !== undefined) {
        return next()
    }

    const defaultUser = crearCoachVacio(id,email)

    const { coach, newUser } = await repositorioCoach.buscarOAgregar(defaultUser)
        .catch(err => {
            console.log("Error al buscar o registrar al coach con google", err)
            return res.status(500).json({
                message: "Hubo un error al buscar o registrar al coach en Train IT. Por favor, reintente mas tarde",

            })
        })

    if (coach) {
        let responseObject = JSON.parse(JSON.stringify(coach))
        responseObject['newUser'] = newUser
        return responseObject
    } else {
        return next()
    }

}