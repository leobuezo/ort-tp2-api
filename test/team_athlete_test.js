import assert from 'assert';
import chai from 'chai';
import Alumno from '../models/team_athlete.js';
import Clase from '../models/training_class.js';

const expect= chai.expect


describe('Alumno del Team', () => {
    let alumno 
    before( () => {
        alumno = new Alumno();
    })

    describe('#anotarseAclases', () => {
        it('tiene un metodo para acceder a las clases', () => {
            //Assert
            expect(alumno.anotarseAClases).to.be.a('function');
        })
    })

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
})
