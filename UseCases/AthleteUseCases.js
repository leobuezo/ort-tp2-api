import Alumno from "../models/team_athlete.js"
import { AthleteRepository } from "../Repository/athlete_repository.js"
import { TeamRepository } from "../Repository/team_repository.js"

const repositorio = new AthleteRepository()
const repoTeam = new TeamRepository()

export const crearAlumno = async (atleta) => {
    return await repositorio.crearAtleta(atleta)
}

export const crearAlumnoVacio = (googleId, email, picture) => { 
    return new Alumno(
            null, //nombre
            null, //apellido
            null, //fechaNacimiento
            null, //dni
            null, //aptoFisico
            null, //Team
            'Atleta', //rol
            email, //email
            googleId, //googleId
            picture // picture
    )
}