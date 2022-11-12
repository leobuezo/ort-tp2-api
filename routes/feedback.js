import express from 'express'
import { body, check } from 'express-validator'
import FeedbackRepository from '../Repository/feedback_respository.js'
import { obtenerFeedbacks, obtenerUnFeedbackPorAtleta, obtenerUnFeedbackPorCoach, obtenerUnFeedbackPorId, borrarFeedback, crearFeedback, darFeedback, cerrarFeedback } from '../Services/FeedbackServices.js'

//Import this callback to validate if a feedback exists or not
import { feedbackExists } from '../CustomValidators/FeedbackValidator.js';

const router = express.Router()
const respositorio = new FeedbackRepository()

/**
 * @swagger
 *  tags:
 *      name: Feedback
 *      description: Manejo de Feedback API Train It
 */

/**
 * @swagger
 * /feedback:
 *   get:
 *     tags: [Feedback]
 *     summary: Obtener todos los registros de feedback
 *     description: Devuelve todos los registros de feedback registrados independientemente del estado de estos.
 *     produces: 
 *      - application/json
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       500:
 *         description: Error de servidor
 */
router.get("/", obtenerFeedbacks)

//POST A FEEDBACK WITH DNI_ATLETA, TITULO_CLASE AND DNI_COACH
router.post("/", crearFeedback)


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


//ADD AN ARGUMENT TO A CERTAIN FEEDBACK
router.put("/giveFeedback/:dni_atleta", darFeedback)

//CLOSE A CERTAIN FEEDBACK
router.put("/closeFeedback/:dni_atleta", cerrarFeedback)

export default router