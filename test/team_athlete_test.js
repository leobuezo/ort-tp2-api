import assert from 'assert';
import chai from 'chai';
import Alumno from '../models/team_athlete.js';
import Clase from '../models/training_class.js';

const expect= chai.expect


describe('Alumno del Team', () => {
     //Arrange
     let alumnoHabilitado;
     let alumnoInhabilitado;
     let claseConCupo;
     let claseSinCupo;
     before( () => {
         alumnoHabilitado = new Alumno("test","test",18,true);

         alumnoInhabilitado= new Alumno("test inhabilitado","test inhabilitado",18,false);

         claseConCupo= new Clase("running", 15);
         claseSinCupo= new Clase("test",1);
         claseSinCupo.anotarAlumno(alumnoHabilitado);
     });


    describe('#anotarseAclases', () => {
        it('un alumno no puede anotarse a clases por no estar habilitado', () => {
 
            //Act
             const result= alumnoInhabilitado.anotarseAClase(claseConCupo);
            
             //Assert
             expect(result).to.equal('RESULTADO.NO_ADMITIDO');
        });
        it('un alumno habilitado puede anotarse a clases con cupo', () => {
            //Act
            const result= alumnoHabilitado.anotarseAClase(claseConCupo);
            
            //Assert
            expect(result).to.equal('ANOTADO.OK');
        });

        it('un alumno habilitado se anota a una clase en lista de espera', () => {
            //Act
            const result= alumnoHabilitado.anotarseAClase(claseSinCupo);
            
            //Assert
            expect(result).to.equal('ANOTADO.ESPERA');
        });
       
    });
/*
    let clases
    before(() => {
      alumno= new Alumno();
    })
    describe('#darBajaDeClases', () => {
        it('tiene un metodo para dar de baja a una clase', () => {
            //Assert
            expect(alumno.darBajaDeClases).to.be.a('function')
        })

        it('dar de baja a las clases', () => {
           //Arrange
           clases= new Clase("test", 5);
           alumno.clases= clases;
           clases.alumnos.push(alumno);
            let motivo= "test";

            //Act
            const result= alumno.darBajaDeClases(clases, motivo)

            //Assert
            expect(result).is.true
        })

    })

    */
})
