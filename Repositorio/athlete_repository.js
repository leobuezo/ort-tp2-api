import Alumno from "../models/team_athlete.js";
import { AthleteStorage } from "./Storage/athlete_storage.js";

export class AthleteRepository{
    constructor(){
        this.storage = new AthleteStorage()
    }

    crearAtleta(nombre, apellido, edad, aptoFisico){
        return this.storage.crearAtleta(new Alumno(nombre, apellido, edad, aptoFisico))
    }

    modificarAtleta(){
        throw new Error("Este endpoint todavia no esta disponible")
    }

    borrarAtleta(atleta){
        return this.storage.borrarAtleta(atleta)
    }

    buscarUnAtleta(id){
        return this.storage.buscarUnAtleta(id)
    }

    async buscarAtleta(){
        return await this.storage.buscarAtleta()
    }
    
}