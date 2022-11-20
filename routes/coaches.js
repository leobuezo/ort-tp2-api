import express, { Router } from 'express'
import { NotImplemented } from '../ErrorHandling/NotImplementedApi.js'
import Entrenador  from '../models/team_coach.js'
import { AdminRepository } from '../Repository/admin_repository.js'
import { CoachRepository } from '../Repository/coach_repository.js'

const router = express.Router()

const repositorio = new CoachRepository()
const repositorioAdmin = new AdminRepository()

//GET ALL COACHES
router.get("/", async (req,res) => {
    const coaches = await repositorio.buscarCoach()
    coaches.length === 0 ? res.status(204).json({"message" : "No hay coaches cargados" }) : res.status(201).json(coaches)
})

//GET A COACH BASED ON THEIR DNI
router.get("/:dni", async (req,res) => {
    const {dni} = req.params
    const coach = await repositorio.buscarUnCoach(dni)
    coach === 0 ? res.status(204).send(`El coach con dni ${dni} no existe en la base`) : res.status(201).json(coach)
})

//CREATE A COACH
router.post("/", async (req,res) => {
    const {nombre, apellido, edad, dni, rol, team, email} = req.body
    const entrenador = await repositorio.buscarUnCoach(dni)

    if (entrenador.length === 1){
        res.status(409).send(`Este coach ya esta registrado en el team`)
    } else{
        const coach = new Entrenador(nombre, apellido, edad, dni, rol, team, email)
        repositorio.crearCoach(coach)

        res.status(201).json(creado)
    }
})

//CREATE A CLASS
router.post("/CrearClase" , (req, res) => {
    const {titulo, cupo} = req.body

    throw new NotImplemented("El endpoint no esta siendo implementado al momento")

    //const clase = repositorio.crearClase(clase)

    res.status(501).json(clase)
})


export default router