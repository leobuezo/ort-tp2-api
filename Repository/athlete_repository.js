import { AthleteStorage } from "./Storage/athlete_storage.js";

export class AthleteRepository {
    constructor() {
        this.storage = new AthleteStorage()
    }

    crearAtleta(atleta) {
        return this.storage.crearAtleta(atleta)
    }

    modificarAtleta(atleta) {
        return this.storage.modificarAtleta(atleta)
    }

    darFeedback(feedback) {
        return this.storage.darFeedback(feedback)
    }

    async borrarAtleta(dni) {
        return await this.storage.borrarAtleta(dni)
    }

    buscarUnAtleta(dni) {
        return this.storage.buscarUnAtleta(dni)
    }

    async buscarAtleta() {
        return await this.storage.buscarAtleta()
    }

    async agregarTeam(dni, team) {
        return await this.storage.agregarTeam(dni, team)
    }
}