import express from 'express'
import { body, check } from 'express-validator'
import { FeedbackRepository } from '../Repository/feedback_respository.js'
import { obtenerFeedbacks, obtenerUnFeedback, obtenerUnFeedbackPorId, borrarFeedback } from '../Services/FeedbackServices.js'

//Import this callback to validate if a feedback exists or not
import { feedbackExists } from '../CustomValidators/FeedbackValidator.js';

const router = express.Router()
const respositorio = new FeedbackRepository()

//GET ALL FEEDBACKS
router.get("/", obtenerFeedbacks)

//GET A FEEDBACK BASED ON ITS ID
router.get("/:feebackId", 
    check('feedbackId').custom(feedbackExists),
    obtenerUnFeedbackPorId)

//GET A FEEDBACK BASED ON ITS ATHLETE DNI AND COACH DNI
router.get("/athlete/:dni_atleta/coach/:dni_coach", obtenerUnFeedback)

//DELETE A FEEDBACK
router.delete("/athlete/:dni_atleta/coach/:dni_coach", borrarFeedback)

//CREATE A FEEDBACK
router.post("/", crearFeedback)

//ADD AN ARGUMENT TO A CERTAIN FEEDBACK
router.put("/darFeedback", darFeedback)

//CLOSE A CERTAIN FEEDBACK
router.put("/cerrarFeedback", cerrarFeedback)

export default router