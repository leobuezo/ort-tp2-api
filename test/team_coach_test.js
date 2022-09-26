import chai from 'chai';
import Alumno from '../models/team_athlete.js'
import Entrenador from '../models/team_coach.js'
import Clase from '../models/training_class.js'

const expect = chai.expect

describe('Entrenador del team', () => {
    let entrenador
    before( () => {
        entrenador = new Entrenador('Juan');
    })

    describe('#crearClase()', () => {
        it('se crea la clase', () => {
            // Act
            let claseNueva = entrenador.crearClase('Runnning', 15)

            // Assert
            expect(claseNueva).to.equal(true)
        })
    })

    let clase
    before( () => {
        clase = new Clase('running', 15)
    })
    
    describe('#cancelarClase()', () => {
        it('se cancela la clase', () => {
            // Act
            let cancelarClase = entrenador.cancelarClase(clase, 'Lluvia')
            // Assert
            expect(cancelarClase).to.equal(true)
        })
    })

    describe('#publicarRutina()', () => {
        it('se publica la rutina para la clase especificada', () => {
            // Act
           let publicarRutina = entrenador.publicarRutina(clase)

            // Assert 
            expect(publicarRutina).to.equal(true)
        })

    })

    describe('#darFeedback()', () => {
        // Arrange
        let alumno = new Alumno('f', 'f', true, 18)

        it('le da feedback al alumno', () => {
            // Act
            let darFeedback = entrenador.darFeedback(clase, alumno, 'bien')

            // Assert
            expect(darFeedback).to.equal(true)
        })
    })
})