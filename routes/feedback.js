import express from 'express'
import { body, check } from 'express-validator'
import FeedbackRepository from '../Repository/feedback_respository.js'
import { obtenerFeedbacks, obtenerUnFeedbackPorAtleta, obtenerUnFeedbackPorCoach, obtenerUnFeedbackPorId, borrarFeedback, crearFeedback } from '../Services/FeedbackServices.js'

//Import this callback to validate if a feedback exists or not
import { feedbackExists } from '../CustomValidators/FeedbackValidator.js';

const router = express.Router()
const respositorio = new FeedbackRepository()

//POST A FEEDBACK WITH DNI_ATLETA, TITULO_CLASE AND DNI_COACH
router.post("/", crearFeedback)

//GET ALL FEEDBACKS
router.get("/", obtenerFeedbacks)

//GET A FEEDBACK BASED ON ITS ID
router.get("/:_id", 
    check('_id').custom(feedbackExists),
    obtenerUnFeedbackPorId)

//GET A FEEDBACK BASED ON ITS ATHLETE DNI
router.get("/athlete/:dni_atleta", obtenerUnFeedbackPorAtleta)

//GET A FEEDBACK BASED ON ITS COACH DNI
router.get("/coach/:dni_coach", obtenerUnFeedbackPorCoach)

//DELETE A FEEDBACK
router.delete("/athlete/:dni_atleta", borrarFeedback)

/*
//ADD AN ARGUMENT TO A CERTAIN FEEDBACK
router.put("/darFeedback", darFeedback)

//CLOSE A CERTAIN FEEDBACK
router.put("/cerrarFeedback", cerrarFeedback)
*/
export default router