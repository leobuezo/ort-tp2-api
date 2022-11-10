import { TeamRepository } from "../Repository/team_repository.js"

const repositorio = new TeamRepository()

export const teamExists = async (codigo) => {

    const team = await repositorio.buscarTeam(codigo)

    if (team.lenght === 0) {
        return Promise.reject(`El team enviado no existe`)
    }
}