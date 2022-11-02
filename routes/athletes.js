import express from 'express'
import Alumno from '../models/team_athlete.js'
import { AdminRepository } from '../Repository/admin_repository.js'
import { AthleteRepository } from '../Repository/athlete_repository.js'
import { obtenerAtletas } from '../Services/AthleteServices.js'

const router = express.Router()

const repositorioAtleta = new AthleteRepository()
const repositorioAdmin = new AdminRepository()

//GET ALL ATHLETES
// router.get("/" ,async (req,res) => {
//      const atletas = await repositorioAtleta.buscarAtleta()
//      res.json(atletas)
// })

//GET ALL ATHLETES
router.get("/" , obtenerAtletas)

//GET AN ATHLETE BASED ON THEIR DNI
router.get("/:dni", async function(req,res) {
    const {dni} = req.params
    const atleta = await repositorioAtleta.buscarUnAtleta(dni)

    atleta.length === 1 ? res.status(201).json(atleta) : res.status(204).send(`La persona con dni ${dni} no existe`)
})

//CREATE AN ATHLETE
router.post("/", async function(req,res) {
    const { nombre, apellido, edad, dni, aptoFisico, team, rol } = req.body
    const atleta = await repositorioAtleta.buscarUnAtleta(dni)
    if(atleta.length === 1)
    {
        res.status(400).json(`Ya existe una persona con el dni ${dni}`)

    }
    else
    {
        const athlete = new Alumno(nombre, apellido, edad, dni, aptoFisico, team, rol)
        const repo = await repositorioAtleta.crearAtleta(athlete)
        res.status(200).json(repo)
    }
})

//DELETE AN ATHLETE
router.delete("/:dni" , async (req,res) => {
    const {dni} = req.params
    const atleta = await repositorioAtleta.buscarUnAtleta(dni)

    if(atleta.length !== 1){
        res.status(404).send(`La persona con dni ${dni} no existe`)
    }
    else
    {
        const repo = await repositorioAtleta.borrarAtleta(dni)
        res.status(200).json(`Se borro a la persona con dni ${dni}`)
    }
})

//ADD AN ATHLETE TO A TEAM
router.put("/" , async (req,res) => {
    const {dni, team} = req.body
    const atleta = await repositorioAtleta.buscarUnAtleta(dni)

    if(atleta.length !== 1){
        res.status(204).send(`El atleta con dni ${dni} no existe`)
    }
    else
    {
        console.log(team)
        console.log(atleta[0])
        const repoAdmin = await repositorioAdmin.registrarAtleta(atleta[0].dni,team)
        res.status(201).json(repoAdmin)
    }
})

export default router