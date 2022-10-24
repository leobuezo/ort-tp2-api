import { Entrenador } from "../models/team_coach";
import { CoachStorage } from "./Storage/coach_storage";

export class CoachRepository{
    constructor(){
        this.storage = new CoachStorage()
    }

    crearCoach(nombre, edad, dni){
        this.storage.crearCoach(new Entrenador(nombre, edad, dni))
    }

    modificarCoach(coach){

    }

    borrarCoach(coach){
        this.storage.borrarCoach(coach)
    }

    buscarCoach(coach){
        this.storage.buscarCoach(coach)
    }

    buscarCoach(){
        this.storage.buscarCoach()
    }
}