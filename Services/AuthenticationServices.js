import Alumno from '../models/team_athlete.js';
import { AthleteRepository } from '../Repository/athlete_repository.js';

const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

const googleUrlAuth = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='
const repositorio = new AthleteRepository()

export const loginGoogle = async (req, res, next) => {
    const accessToken = req.params.accessToken
    fetch(`${googleUrlAuth}${accessToken}`)
        .then(res => res.json())
        .then(async data => {
            const { id, email, given_name, family_name, error } = data

            if (error !== undefined) {
                return next()
            }

            /*
                creo un alumno vacio para despues pedirle que ingrese sus datos
                la primera vez que se registra
            */
            
                const defaultUser = new Alumno(
                null, //nombre
                null, //apellido
                0, //dni
                0, //edad
                true, //aptoFisico
                null, //Team
                null, //rol
                email, //email
                id, //googleId
            )

            const { usuario, newUser } = await repositorio.buscarOAgregar(defaultUser)
                .catch(err => {
                    console.log("Error al buscar o registrar al usuario con google", err)
                    return res.status(500).json({
                        message: "Hubo un error al buscar o registrar al usuario en Train IT. Por favor, reintente mas tarde",

                    })
                })

                if (usuario) {
                let responseObject = JSON.parse(JSON.stringify(usuario))
                responseObject['newUser'] = newUser                
                return res.status(201).json(responseObject)
            }

            return next()

        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: "Su usuario no es valido para registrase con google. Por favor, reintente mas tarde."
            })
        })

}

export const cb = (req, res, mensaje) => {
    return res.status(500).json({
        message: "Hubo un error al iniciar sesion. Por favor, reintente mas tarde."
    })
}