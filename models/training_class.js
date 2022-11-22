

export default class Clase{
    constructor(titulo, cupo, ubicacion, diaActividad, coachId){
        this.titulo = titulo;
        this.cupo = cupo;
        this.ubicacion = ubicacion;
        this.diaActividad = diaActividad
        this.alumnos = [];
        this.listaEspera = [];
        this.esCancelada = false;
        this.coachId= coachId;
    }
 
    darBaja(alumno, motivo){
        this.alumnos.filter(alum => alum != alumno);
        return this.alumnos.includes(alumno);
    }

    anotarAlumno(alumno){
        let resultado;
        if(alumno.aptoFisico == true && alumno.cuotaAlDia == true){
            if(this.tieneCupo()){
                this.alumnos.push(alumno);
                resultado= 'ANOTADO.OK';
            }else{
                this.listaEspera.push(alumno);
                resultado= 'ANOTADO.ESPERA';
            }
        }else{
            resultado= 'RESULTADO.NO_ADMITIDO'
        }

        return resultado;
    }

    tieneCupo(){
        return this.alumnos.length < this.cupo;
    }

}