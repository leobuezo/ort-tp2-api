import Alumno from "../models/team_athlete.js"
import { AthleteRepository } from "../Repository/athlete_repository.js"
import { TeamRepository } from "../Repository/team_repository.js"

const repositorio = new AthleteRepository()
const repoTeam = new TeamRepository()

export const crearAlumno = async (atleta) => {
    return await repositorio.crearAtleta(atleta)
}

export const agregarTeam = async (googleId, team) => {

    let response
    let pudo
    const atleta = await repositorio.buscarUnAtleta(googleId)

    if (atleta.length === 1) {
        response = await repositorio.agregarTeam(atleta[0].googleId, team)
        pudo = response.modifiedCount === 0 ? false : true
    }

    return pudo
}

export const crearAlumnoVacio = (googleId, email) => { 
    return new Alumno(
            null, //nombre
            null, //apellido
            0, //edad
            null, //dni
            null, //aptoFisico
            null, //Team
            'Atleta', //rol
            email, //email
            googleId, //googleId
    )
}