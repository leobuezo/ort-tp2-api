export default class Clase{
    constructor(titulo, cupo){
        this.titulo = titulo
        this.cupo = cupo
        this.alumnos= new Array(cupo)
    }

    darBaja(alumno, motivo){
        this.alumnos.filter(alum => alum != alumno);
        return this.alumnos.includes(alumno);
    }
}