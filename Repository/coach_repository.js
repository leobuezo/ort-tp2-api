import { CoachStorage } from "./Storage/coach_storage.js";

export class CoachRepository{
    constructor(){
        this.storage = new CoachStorage()
    }

    crearCoach(coach){
        return this.storage.crearCoach(coach)
    }

    modificarCoach(googleId, objectToModify){
        return this.storage.modificarCoach(googleId, objectToModify)
    }

    borrarCoach(googleId){
        return this.storage.borrarCoach(googleId)
    }

    buscarUnCoach(googleId){
        return this.storage.buscarUnCoach(googleId)
    }

    buscarCoach(){
        return this.storage.buscarCoach()
    }

    async buscarCoachPorTeam(googleId, team){
        return await this.storage.buscarCoachPorTeam(googleId, team)
    }

    async registrarCoachAlTeam(googleId, team) {
        return await this.storage.registrarCoachAlTeam(googleId, team)
    }

    buscarCoachPorDni(dni){
        return this.storage.buscarCoachPorDni(dni)
    }

}