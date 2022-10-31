import { Rol } from "./roles.js";

export default class Alumno {
    constructor(nombre, apellido, edad, dni, aptoFisico, team, rol, email){ 
        this.nombre = nombre
        this.apellido = apellido
        this.edad = edad
        this.dni = dni
        this.aptoFisico = aptoFisico
        this.team = team
        this.cuotaAlDia = true
        this.rol = new Rol(rol)
        this.email = email
    }

/*
    anotarseAClase(clase){
        let resultado = 'RESULTADO.ERROR';
        if(clase != null & clase != undefined){
            resultado= clase.anotarAlumno(this)
            if(resultado == 'ANOTADO.OK' || resultado == 'ANOTADO.ESPERA'){
               this.clase= clase
            }
        }
        return resultado
    }


    darBajaDeClase(clase, motivo){
        if(this.clase == clase){
            return this.clase.darBaja(this, motivo);
        }
        return false;
    }

*/
}