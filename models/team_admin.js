import chalk from "chalk";
import Alumno from "../models/team_athlete.js";
import Entrenador from "../models/team_coach.js";
import { Rol } from "./roles.js";

export default class AdministradorDelTeam {
    constructor(nombre, apellido, edad, team, rol, dni, email){
        this._id = 'abcde12345' //generateUUID()
        this.nombre = nombre
        this.apellido = apellido,
        this.edad = edad
        this.team = team
        this.rol = new Rol(rol)
        this.dni = dni
        this.email = email
    }

    generateUUID(){
        return uuidv4()
    }

    registrarAlumnoAlTeam(prospecto){
        if(prospecto == null || prospecto == undefined) {
            console.error(chalk.bgRed('ERROR: prospecto no puede ser null o undefined.'));
            return "PROSPECTO_INEXISTENTE";
        }
        if(this.validarAptoFisico(prospecto.aptoFisico) && this.validarEsMayor(prospecto.edad)) {
            let alumno = new Alumno(prospecto.nombre, prospecto.apellido, prospecto.edad, prospecto.dni,  prospecto.aptoFisico, this.nombreTeam, 'Athlete', prospecto.email);
            console.log(chalk.bgBlue('Registrando alumno al team:'));
            console.log(JSON.stringify(alumno));
            return alumno    
        } else {
            console.warn(chalk.bgCyan('WARN: prospecto con datos inválidos.'));
            return "PROSPECTO_INVALIDO";
        }
    }

    registrarEntrenadorAlTeam(prospectoCoach){
        let entrenador = new Entrenador(prospectoCoach.nombre, prospectoCoach.apellido, prospectoCoach.edad, prospectoCoach.dni, 'Coach', this.team, prospectoCoach.email) 
        return entrenador
    }

    validarAptoFisico(aptoFisico){
        return aptoFisico == true;
    }

    validarEsMayor(edad){
        const EDAD_PERMITIDA = 18;
        return edad >= EDAD_PERMITIDA;
    }
}

