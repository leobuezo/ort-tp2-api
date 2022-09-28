export default class Clase{
    constructor(titulo, cupo){
        this.titulo = titulo
        this.cupo = cupo
        this.alumnos= new Array()
        this.listaEspera= new Array();
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