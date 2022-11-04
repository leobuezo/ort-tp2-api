import express from 'express'
import { body, check } from 'express-validator'
import { AthleteRepository } from '../Repository/athlete_repository.js'
import { obtenerAtletas, obtenerUnAtleta, crearAtleta, borrarAtleta, agregarAlTeam, modificarAtleta } from '../Services/AthleteServices.js'

//Import this callback to validate if user exists or not
import { validateUser, userExists } from '../CustomValidators/AthleteValidator.js'

const router = express.Router()
const respositorio = new AthleteRepository()

//GET ALL ATHLETES
router.get("/",
    obtenerAtletas)

//GET AN ATHLETE BASED ON THEIR DNI
router.get("/:dni",
    check('dni').custom(userExists),
    obtenerUnAtleta)

//CREATE AN ATHLETE
router.post("/",
    check('edad').toInt(),
    check('dni').custom(validateUser),
    body('email').isEmail(),
    body('aptoFisico').isBoolean(),
    crearAtleta)

//DELETE AN ATHLETE
router.delete("/:dni",
    check('dni').custom(userExists),
    borrarAtleta)

//ADD AN ATHLETE TO A TEAM
router.put("/agregarTeam",
    check('dni').custom(userExists),
    agregarAlTeam)

router.put("/", 
    modificarAtleta)

//Chequear si alguien hace algun servicio para las clases, si no, 
//lo hago para poder hacer el endpoint de darse de baja a una clase

export default router