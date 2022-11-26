import Entrenador from "../models/team_coach.js"

export const crearCoachVacio = (googleId, email, picture) => {
    //nombre, apellido, email, dni, rol, team, fechaNacimiento, googleId
    return new Entrenador(
        null, //nombre
        null, //apellido
        email, //email
        null, //dni
        "Coach", //rol
        null, //team 
        null, //fechaNacimiento
        googleId, //googleId,
        picture // picture
    )
}