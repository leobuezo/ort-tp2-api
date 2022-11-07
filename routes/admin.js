import express from 'express'
import { AdminRepository } from '../Repository/admin_repository.js'
import { AthleteRepository } from '../Repository/athlete_repository.js'
import { CoachRepository } from '../Repository/coach_repository.js'
import { crearAtleta, crearCoach, crearAdmin } from '../Services/AdminServices.js'

const router = express.Router()

const repositorioCoach = new CoachRepository()
const repositorioAtleta = new AthleteRepository()
const repositorio = new AdminRepository()
//const repositorioTeam = new TeamRepository()

router.use(express.json())

//REGISTER AN ATHLETE TO THE TEAM
router.post("/registrarAtleta", crearAtleta)

//REGISTER A COACH TO THE TEAM  DEPRECATED. USE POST /COACHES TO CREATE A COACH
router.post("/registrarCoach" , crearCoach)

//CREATE AN ADMIN
router.post("/" , crearAdmin)  

export default router