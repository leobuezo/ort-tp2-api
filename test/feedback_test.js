import assert from 'assert';
import chai from 'chai';
import chalk from 'chalk';
import Feedback from '../models/feedback.js';
import {Entrenador} from '../models/team_coach.js';
import Alumno from '../models/team_athlete.js'
import Admin from '../models/team_admin.js'

const expect= chai.expect
const log = console.log;

describe('Gestión de feedback', () => {
    let admin;
    let prospectoAlumno;
    let alumnoHabilitado;
    let entrenador;
    let clase;
    let feedbackParaSergio;
    let feedbackContent;
    before( () => {
        //Arrange
        admin = new Admin('Pepe Admin', 'ORThletics');
        prospectoAlumno = {
            nombre: 'Sergio',
            apellido: 'Agüero',
            aptoFisico: true,
            edad: 18,
            dni: 12345678
        };
        entrenador = {
            nombre: 'Carlos',
            apellido: 'Duran',
            matricula: null,
            legajo: '124',
            edad: 32,
            dni: 22333444
        };
        feedbackContent = `
            Lorem ipsum dolor sit amet consectetur adipiscing elit egestas pretium, fusce cum aliquet semper molestie 
            augue odio netus cubilia, justo fames dis torquent sociosqu vehicula condimentum ac. Class placerat erat 
            quis lacinia urna gravida nibh nunc phasellus leo commodo tristique aliquet, dapibus nisi suspendisse ante 
            montes iaculis mollis habitant aliquam diam elementum purus. Erat tempor vehicula per ad bibendum pulvinar 
            elementum, habitasse augue proin massa venenatis etiam nascetur, gravida dui cursus varius nam nostra.`;        
        entrenador = admin.registrarEntrenadorAlTeam(entrenador);
        alumnoHabilitado = admin.registrarAlumnoAlTeam(prospectoAlumno);
        clase = entrenador.crearClase('Funcional', 10, 'Lagos', new Date(2022, 10, 1)); //month seems to be 0-indexed
        clase.anotarAlumno(alumnoHabilitado);
    });
    it('Un alumno solicita feedback de una clase de funcional', () => {
        //Act
        log(chalk.bgBlue(`alumno ${alumnoHabilitado.nombre} solicita feedback del entrenador ${entrenador.nombre}`));
        feedbackParaSergio = alumnoHabilitado.solicitarFeedback(clase, entrenador);
        console.log(`Feedback id:${feedbackParaSergio.id} , estado:${feedbackParaSergio.estado} , dni_atleta:${feedbackParaSergio.dni_atleta} , dni_coach:${feedbackParaSergio.dni_coach}`);
        //Assert
        assert.equal(feedbackParaSergio.estado, 'pending');
    });
    it('El entrenador del team brinda una devolución al alumno que la solititó', () => {
        log(chalk.bgBlue(`entrenador ${entrenador.nombre} brinda feedback para alumno ${alumnoHabilitado.nombre}`));
        entrenador.darFeedback(feedbackParaSergio, feedbackContent);
        console.log(`Feedback id:${feedbackParaSergio.id} , estado:${feedbackParaSergio.estado} , dni_atleta:${feedbackParaSergio.dni_atleta} , dni_coach:${feedbackParaSergio.dni_coach}`);
        //Assert
        assert.equal(feedbackParaSergio.estado, 'completed');
    });
    it('El alumno que pidió una devolución la marca como leída', () => {
        //Act
        log(chalk.bgBlue(`alumno ${alumnoHabilitado.nombre} lee feedback y lo cierra.`));
        alumnoHabilitado.cerrarFeedback(feedbackParaSergio);
        console.log(`Feedback id:${feedbackParaSergio.id} , estado:${feedbackParaSergio.estado} , dni_atleta:${feedbackParaSergio.dni_atleta} , dni_coach:${feedbackParaSergio.dni_coach}`);
        //Assert
        assert.equal(feedbackParaSergio.estado, 'closed');
    });
});