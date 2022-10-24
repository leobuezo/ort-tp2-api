import chalk from "chalk";
import Alumno from "../models/team_athlete.js";
import Entrenador from "../models/team_coach.js";

const EDAD_PERMITIDA = 18;
export default class AdministradorDelTeam {
    constructor(nombre, nombreTeam, rol){
        this.nombre = nombre;
        this.nombreTeam = nombreTeam
        this.rol = rol
    }

    registrarAlumnoAlTeam(prospecto){
        if(prospecto == null || prospecto == undefined) {
            console.error(chalk.bgRed('ERROR: prospecto no puede ser null o undefined.'));
            return "PROSPECTO_INEXISTENTE";
        }
        if(this.validarAptoFisico(prospecto.aptoFisico) && this.validarEsMayor(prospecto.edad)) {
            let alumno = new Alumno(prospecto.nombre, prospecto.apellido, prospecto.edad, prospecto.aptoFisico, this.nombreTeam);
            console.log(chalk.bgBlue(JSON.stringify(alumno)));
            return alumno    
        } else {
            console.warn(chalk.bgCyan('WARN: prospecto con datos inválidos.'));
            return "PROSPECTO_INVALIDO";
        }
    }

    registrarEntrenadorAlTeam(){
        let entrenador = new Entrenador() 
        return entrenador
    }

    validarAptoFisico(aptoFisico){
        return aptoFisico == true;
    }

    validarEsMayor(edad){
        return edad >= EDAD_PERMITIDA;
    }
}

