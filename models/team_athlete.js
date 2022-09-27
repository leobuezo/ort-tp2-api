export default class Alumno {
    constructor(nombre, apellido, edad, aptoFisico, team){
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.aptoFisico = aptoFisico;
        this.team= team;
    }

    anotarseAClases(){
        this.clases= this.team.anotarseAClases();
    }

    darBajaDeClases(clases, motivo){
        if(this.clases == clases){
            return this.clases.darBaja(this, motivo);
        }
        return false;
    }


}