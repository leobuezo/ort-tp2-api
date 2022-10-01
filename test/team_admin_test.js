import assert from 'assert';
import chai from 'chai';
import chalk from 'chalk';
import Admin from '../models/team_admin.js';
import Alumno from '../models/team_athlete.js'
import Entrenador from '../models/team_coach.js'

const expect = chai.expect

describe('Administrador Del Team', () => { 
    let admin
    before( () => {
        admin = new Admin('Pepe Admin', 'ORThletics');
    })

    describe('#registrarAlumnoAlTeam()', () => {
        let prospectoAlumno
        before(() => {
            // Arrange
            prospectoAlumno = {
                nombre: 'Sergio',
                apellido: 'Agüero',
                aptoFisico: true,
                edad: 18
            };
        })
        
        it('Tiene un metodo para agregar alumno', () => {
            // Assert
            expect(admin.registrarAlumnoAlTeam).to.be.a('function')
        })

        it('el prospecto de Alumno tiene datos validos', () => {
            // Assert
            expect(prospectoAlumno).to.have.property('nombre')
            expect(prospectoAlumno).to.have.property('apellido')
            expect(prospectoAlumno).to.have.property('aptoFisico')
            expect(prospectoAlumno).to.have.property('edad')
            assert.notEqual(prospectoAlumno.nombre, null)
            assert.notEqual(prospectoAlumno.apellido, undefined)
            assert.notEqual(prospectoAlumno.apellido, null)
            assert.notEqual(prospectoAlumno.nombre, undefined)
            assert.notEqual(prospectoAlumno.aptoFisico, null)
            assert.notEqual(prospectoAlumno.aptoFisico, undefined)
            assert.notEqual(prospectoAlumno.edad, null)
            assert.notEqual(prospectoAlumno.edad, undefined)
        })

        it('el solicitante tiene apto fisico', () => {
            // Act
            const result = admin.validarAptoFisico(prospectoAlumno.aptoFisico)
            // Assert
            expect(result).to.equal(true)
        })

        it('el solicitante sea mayor de edad', () => {
            // Act
            const result = admin.validarEsMayor(prospectoAlumno.edad)
            // Assert
            expect(result).to.equal(true)
        })

        it('se registra el nuevo alumno', () => {
            // Act
            const result = admin.registrarAlumnoAlTeam(prospectoAlumno)
            // Assert
            expect(result).instanceof(Alumno)
        })
    })

    describe('#registrarEntrenadorAlTeam()', () => {
        let prospectoEntrenador
        before(() => {
            // Arrange
            prospectoEntrenador = {
                nombre: 'f',
                apellido: 'f',
                matricula: null,
                legajo: '124',
                edad: 32
            };
        })
        
        it('Tiene un metodo para agregar entrenador', () => {
            // Assert
            expect(admin.registrarEntrenadorAlTeam).to.be.a('function')
        })
        
        it('el nuevo entrenador tiene datos validos', () => {
            // Assert
            expect(prospectoEntrenador).to.have.property('nombre')
            expect(prospectoEntrenador).to.have.property('apellido')
            expect(prospectoEntrenador).to.have.property('matricula')
            expect(prospectoEntrenador).to.have.property('legajo')
            expect(prospectoEntrenador).to.have.property('edad')
            assert.notEqual(prospectoEntrenador.nombre, null)
            assert.notEqual(prospectoEntrenador.nombre, undefined)
            assert.notEqual(prospectoEntrenador.apellido, undefined)
            assert.notEqual(prospectoEntrenador.apellido, null)
            assert.notStrictEqual(prospectoEntrenador.matricula, undefined)
            assert.notStrictEqual(prospectoEntrenador.legajo, undefined)
            assert.notEqual(prospectoEntrenador.edad, null)
            assert.notEqual(prospectoEntrenador.edad, undefined)
        })

        it('se registra el nuevo entrenador', () => {
            // Act
            const result = admin.registrarEntrenadorAlTeam(prospectoEntrenador)
            // Assert
            expect(result).instanceof(Entrenador)
        })
    })
 })
