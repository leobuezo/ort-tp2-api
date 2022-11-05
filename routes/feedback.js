import express from 'express'
import { body, check } from 'express-validator'
import { FeedbackRepository } from '../Repository/feedback_respository.js'

//Import this callback to validate if user exists or not
import { validateUser, userExists } from '../CustomValidators/AthleteValidator.js'

const router = express.Router()
const respositorio = new FeedbackRepository()

//GET ALL FEEDBACKS
router.get("/",
    obtenerFeedbacks)

//GET A FEEDBACK BASED ON ITS ATHLETE DNI AND CLASS TITLE
router.get("/:titulo_clase",
    check('dni').custom(userExists),
    obtenerUnFeedback)

//CREATE A FEEDBACK
router.post("/",
    check('edad').toInt(),
    check('dni').custom(validateUser),
    body('email').isEmail(),
    body('aptoFisico').isBoolean(),
    crearFeedback)

//DELETE A FEEDBACK
router.delete("/:dni",
    check('dni').custom(userExists),
    borrarFeedback)

//ADD AN ARGUMENT TO A CERTAIN FEEDBACK
router.put("/agregarTeam",
    check('dni').custom(userExists),
    darFeedback)

//CLOSE A CERTAIN FEEDBACK
router.put("/agregarTeam",
    check('dni').custom(userExists),
    cerrarFeedback)


//Chequear si alguien hace algun servicio para las clases, si no, 
//lo hago para poder hacer el endpoint de darse de baja a una clase

export default router