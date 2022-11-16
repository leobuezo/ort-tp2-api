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

    darFeedback(feedback){
        return this.storage.darFeedback(feedback)
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

    buscarCoachPorDni(dni){
        return this.storage.buscarCoachPorDni(dni)
    }

    crearClase(clase){
        this.storage.crearClase(clase)
    }
}