import { AthleteRepository } from "../Repository/athlete_repository.js"

const repositorio = new AthleteRepository()

export const crearAlumno = async (atleta) => {
    return await repositorio.crearAtleta(atleta)
}

export const agregarTeam = async (dni, team) => {

    let response
    let pudo
    const atleta = await repositorio.buscarUnAtleta(dni)

    if (atleta.length === 1) {
        response = await repositorio.agregarTeam(atleta[0].dni, team)
        pudo = response.modifiedCount === 0 ? false : true
    }

    return pudo
}