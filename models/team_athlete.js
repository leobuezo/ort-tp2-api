export default class Alumno {
    constructor(nombre, apellido, edad, aptoFisico, team){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.aptoFisico = aptoFisico;
        this.team= team;
        this.cuotaAlDia= true;
    }


    anotarseAClase(clase){
        let resultado = 'RESULTADO.ERROR';
        if(clase != null & clase != undefined){
            resultado= clase.anotarAlumno(this)
            if(resultado == 'ANOTADO.OK' || resultado == 'ANOTADO.ESPERA'){
               this.clase= clase;
            }
        }
        return resultado; 
    }


    darBajaDeClase(clase, motivo){
        if(this.clase == clase){
            return this.clase.darBaja(this, motivo);
        }
        return false;
    }


}