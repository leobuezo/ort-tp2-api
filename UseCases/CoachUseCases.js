import Entrenador from "../models/team_coach.js"

export const crearCoachVacio = (googleId, email) => {
    return new Entrenador(
        null, //nombre
        null, //apellido
        0, //edad
        null, //dni
        'Coach', //rol
        null, //team
        email, //email
        googleId, //googleId
    )
}