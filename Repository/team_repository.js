import Alumno from "../models/team_athlete.js";
import { TeamStorage } from "./Storage/team_storage.js";

export class TeamRepository{
    constructor(){
        this.storage = new TeamStorage()
    }

    buscarAtletaPorTeam(dni, team){
        return this.storage.buscarAtletaPorTeam(dni, team)
    }

    cargarTeam(gppgleId, team){
        return this.storage.cargarTeam(googleId, team)
    }
    
}