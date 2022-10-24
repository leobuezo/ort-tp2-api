import Alumno from "../models/team_athlete";
import { AthleteStorage } from "./Storage/athlete_storage";

export class AthleteRepository{
    constructor(){
        this.storage = new AthleteStorage()
    }

    crearAtleta(nombre, apellido, edad, aptoFisico, team){
        return await this.storage.crearAtleta(new Alumno(nombre, apellido, edad, aptoFisico, team))
    }

    modificarAtleta(){
        throw new Error("Este endpoint todavia no esta disponible")
    }

    borrarAtleta(atleta){
        return await this.storage.borrarAtleta(atleta)
    }

    buscarAtleta(atleta){
        return await this.storage.buscarAtleta(atleta)
    }

    buscarAtleta(){
        return await this.storage.buscarAtleta()
    }
    
}