import Alumno from "../models/team_athlete.js";
import Entrenador from "../models/team_coach.js";

export default class AdministradorDelTeam {
    constructor(nombre){
        this.nombre = nombre;
    }

    registrarAlumnoAlTeam(prospecto){
        let alumno = new Alumno() 
        return alumno
    }

    registrarEntrenadorAlTeam(){
        let entrenador = new Entrenador() 
        return entrenador
    }

    validarAptoFisico(alumno){
        return true
    }

    validarEsMayor(alumno){
        return true
    }
}

