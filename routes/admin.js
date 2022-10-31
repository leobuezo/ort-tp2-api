import express from 'express'
import { DeprecatedEndpoint } from '../ErrorHandling/Deprecated.js'
import { NotImplemented } from '../ErrorHandling/NotImplementedApi.js'
import AdministradorDelTeam from '../models/team_admin.js'
import Alumno from '../models/team_athlete.js'
import { Entrenador } from '../models/team_coach.js'
import { AdminRepository } from '../Repositorio/admin_repository.js'
import { AthleteRepository } from '../Repositorio/athlete_repository.js'
import { CoachRepository } from '../Repositorio/coach_repository.js'

const router = express.Router()

const repositorioCoach = new CoachRepository()
const repositorioAtleta = new AthleteRepository()
const repositorio = new AdminRepository()
//const repositorioTeam = new TeamRepository()

router.use(express.json())

//REGISTER AN ATHLETE TO THE TEAM
router.post("/registrarAtleta", async (req, res) => {
    
    throw new NotImplemented("El endpoint no esta siendo implementado al momento")

    const {nombre, apellido, edad, dni, aptoFisico, team, rol} = req.body

    const existeEnTeam = repositorioTeam.buscarAtletaPorTeam(dni,team)

    if (existeEnTeam.length === 1) {
        res.status(409).send(`El Atleta ${nombre} ya esta registrado al team ${team} `)
    }

    if (!aptoFisico) {
        res.status(400).send(`El atleta ${nombre} no puede ser registrado ya que no tiene el apto fisico al dia`)
    } 
    
    if(edad <18){
        res.status(400).send(`El atleta ${nombre} no puede ser registrado ya que no tiene la edad requerida`)
    } else {
        const atleta = new Alumno(nombre, apellido, edad, dni, aptoFisico, team, rol)
        repositorio.registrarAtleta(atleta)
    
        res.status(201).send(`Se creo exitosamente al atleta al team`)
    }
})

//REGISTER A COACH TO THE TEAM  DEPRECATED. USE POST /COACHES TO CREATE A COACH
router.post("/registrarCoach" , async (req, res) => {

    throw new DeprecatedEndpoint("Este endpoint ya no esta disponible. Por favor usar /Coaches")
})

//CREATE AN ADMIN
router.post("/" , async (req, res) => {

    throw new NotImplemented("El endpoint no esta siendo implementado al momento")

    const {nombre, nombreTeam, dni} = req.body

    const administrador = new AdministradorDelTeam(nombre, nombreTeam, "Administrador", dni)

    const admin = repositorio.crearAdmin(administrador)

//    const team = repositorioTeam.crearTeam(nombre, codigo)

    res.status(201).json(admin)

})  
export default router