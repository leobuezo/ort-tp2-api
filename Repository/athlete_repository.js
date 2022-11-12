import { AthleteStorage } from "./Storage/athlete_storage.js";

export class AthleteRepository {
    constructor() {
        this.storage = new AthleteStorage()
    }

    crearAtleta(atleta) {
        return this.storage.crearAtleta(atleta)
    }

    modificarAtleta(googleId,dni,team) {
        return this.storage.modificarAtleta(googleId,dni,team)
    }

    darFeedback(feedback) {
        return this.storage.darFeedback(feedback)
    }

    async borrarAtleta(dni) {
        return await this.storage.borrarAtleta(dni)
    }

    buscarUnAtleta(googleId) {
        return this.storage.buscarUnAtleta(googleId)
    }

    async buscarAtleta() {
        return await this.storage.buscarAtleta()
    }

    async agregarTeam(dni, team) {
        return await this.storage.agregarTeam(dni, team)
    }

    async buscarOAgregar(atleta){
        return await this.storage.buscarOAgregar(atleta)
    }
}