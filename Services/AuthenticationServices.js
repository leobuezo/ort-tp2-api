import { athleteAuthenticationUseCase, coachAuthenticationUseCase } from '../UseCases/AuthenticationUseCases.js';
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

const googleUrlAuth = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='

export const loginGoogle = async (req, res, next) => {
    const accessToken = req.params.accessToken
    fetch(`${googleUrlAuth}${accessToken}`)
        .then(res => res.json())
        .then(async data => {
            const responseObject = await athleteAuthenticationUseCase(res, next, data)
            return res.status(201).json(responseObject)

        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: "Su usuario no es valido para registrase con google. Por favor, reintente mas tarde."
            })
        })
}

export const loginGoogleCoach = (req, res, next) => {
    const accessToken = req.params.accessToken
    fetch(`${googleUrlAuth}${accessToken}`)
        .then(res => res.json())
        .then(async data => {
            const responseObject = await coachAuthenticationUseCase(res, next, data)
            return res.status(201).json(responseObject)
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
        message: "No pudo iniciar sesion correctamente, por favor vuelva a intentarlo"
    })
}