import Alumno from "../models/team_athlete.js";
import { TeamStorage } from "./Storage/team_storage.js";

export class TeamRepository{
    constructor(){
        this.storage = new TeamStorage()
    }

    buscarAtletaPorTeam(googleId){
        return this.storage.buscarAtletaPorTeam(googleId)
    }

    buscarCoachPorTeam(googleId, team){
        return this.storage.buscarCoachPorTeam(googleId, team)
    }

    cargarTeam(gppgleId, team){
        return this.storage.cargarTeam(googleId, team)
    }
    
}