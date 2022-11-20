import { DeprecatedEndpoint } from "../ErrorHandling/Deprecated.js"
import Alumno from "../models/team_athlete.js"
import AdministradorDelTeam from '../models/team_admin.js'
import { AdminRepository } from '../Repository/admin_repository.js'
import { TeamRepository } from '../Repository/team_repository.js'
import { validationResult } from "express-validator"
import { AthleteRepository } from "../Repository/athlete_repository.js"
import { CoachRepository } from "../Repository/coach_repository.js"
const fetch = (...args) =>
    import('node-fetch').then(({ default: fetch }) => fetch(...args));

const repositorioTeam = new TeamRepository()
const repositorio = new AdminRepository()
const repositorioAtleta = new AthleteRepository()
const repositorioCoach = new CoachRepository()

export const crearAdmin = async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }

    const googleUrlAuth = 'https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token='

    const accessToken = req.params.accessToken

    fetch(`${googleUrlAuth}${accessToken}`)
        .then(res => res.json())
        .then(async data => {

            const {email, id} = data
            
            const administrador = new AdministradorDelTeam( "equipo1", "Administrador", email, id)

            const admin = await repositorio.crearAdmin(administrador)
            return res.status(201).json(admin)
            //return res.status(201).json(responseObject)

        })
        .catch(err => {
            console.log(err)
            return res.status(500).json({
                message: "Su usuario no es valido para registrase con google. Por favor, reintente mas tarde."
            })
        })

}

export const crearAtleta = async (req, res) => {
    
    //throw new NotImplemented("El endpoint no esta siendo implementado al momento")

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }

    const { googleId, team } = req.body

    const modify = await repositorioAtleta.agregarTeam(googleId, team)
    if(modify.modifiedCount == 1){
        return res.status(201).send(`Se creo exitosamente al atleta al team`)
    }else{
        return res.status(400).send(`No se pudo registrar el atleta al team`)
    }
}

export const crearCoach =  async (req, res) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({
            mensaje: "Por favor, revisar los siguientes errores:",
            errores: errors.array()
        })
    }

    const { googleId, team } = req.body

    const modify = await repositorioCoach.registrarCoachAlTeam(googleId, team)
    if(modify.modifiedCount == 1){
        return res.status(201).send(`Se creo exitosamente al coach al team`)
    }else{
        return res.status(400).send(`No se pudo registrar el coach al team`)
    }
}

//LLAMAR A SERVICE DE COACH Y ATLETAS PARA LISTAR USUARIOS PENDIENTES
export const usuariosPendientes = async (req,res) => {
     throw new NotImplemented("El endpoint no esta siendo implementado al momento")

} 
