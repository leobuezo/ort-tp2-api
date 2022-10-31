import { CoachStorage } from "./Storage/coach_storage.js";

export class CoachRepository{
    constructor(){
        this.storage = new CoachStorage()
    }

    crearCoach(coach){
        return this.storage.crearCoach(coach)
    }

    modificarCoach(coach){
        return this.storage.modificarCoach(coach)
    }

    darFeedback(feedback){
        return this.storage.darFeedback(feedback)
    }

    borrarCoach(coach){
        return this.storage.borrarCoach(coach)
    }

    buscarUnCoach(dni){
        return this.storage.buscarUnCoach(dni)
    }

    buscarCoach(){
        return this.storage.buscarCoach()
    }

    crearClase(clase){
        this.storage.crearClase(clase)
    }
}