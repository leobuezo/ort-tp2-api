import { AthleteStorage } from "./Storage/athlete_storage.js";

export class AthleteRepository {
    constructor() {
        this.storage = new AthleteStorage()
    }

    crearAtleta(atleta) {
        return this.storage.crearAtleta(atleta)
    }

    modificarAtleta(googleId, objectToModify) {
        return this.storage.modificarAtleta(googleId, objectToModify)
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

    async buscarUnAtletaPorDni(dni) {
        return await this.storage.buscarUnAtletaPorDni(dni)
    }

    async buscarAtleta() {
        return await this.storage.buscarAtleta()
    }

    async agregarTeam(googleId, team) {
        return await this.storage.agregarTeam(googleId, team)
    }

    async buscarOAgregar(atleta) {
        return await this.storage.buscarOAgregar(atleta)
    }

    async buscarAtletaPorTeam(googleId, team) {
        return await this.storage.buscarAtletaPorTeam(googleId, team)
    }


    async darseDeBajaClase(googleId, idClase) {
        return await this.storage.darseDeBajaClase(googleId, idClase)
    }

    async unirseAClase(googleId, idClase) {
        return await this.storage.unirseAClase(googleId, idClase)
    }

    async buscarClaseRegistrada(googleId,idClase){

    return await this.storage.buscarClaseRegistrada(googleId,idClase)
}
    
}