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

            // creo un alumno vacio para despues pedirle que ingrese sus datos
            // la primera vez que se registra
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
                })

            if (usuario) {
                let responseObjectNew = JSON.parse(JSON.stringify(usuario))
                responseObjectNew['newUser'] = newUser
                return res.status(201).json(responseObjectNew)
            }

            return next()

        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: "Hubo un error al intentar iniciar sesion por google."
            })
        })

}

export const cb = (req, res) => {
    return res.status(500).json({
        message: "Hubo un error al iniciar sesion. Por favor, intente nuevamente"
    })
}