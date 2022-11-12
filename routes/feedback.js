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
 * components:
 *   schemas:
 *      Feedback:
 *          type: object
 *          required: 
 *              - dni_atleta
 *              - titulo_clase
 *              - dni_coach
 *          properties:
 *              dni_atleta:
 *                  type: integer
 *                  description: DNI del atleta
 *              titulo_clase:
 *                  type: string
 *                  description: Título de la clase en la que participó el atleta
 *              dni_coach:
 *                  type: integer
 *                  description: DNI del coach
 *          example:
 *              dni_atleta: 12345685
 *              titulo_clase: Clase de Funcional
 *              dni_coach: 443337777
 */

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

/**
 * @swagger
 * /feedback:
 *   post:
 *     tags: [Feedback]
 *     summary: Crear un nuevo registro de feedback
 *     description: Creates a new feedback requested by an athlete.
 *     requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  $ref : '#/components/schemas/Feedback'
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       400:
 *         description: Parametros invalidos.
 *       409:
 *         description: Conflicto
 *       500:
 *         description: Error de servidor.
 */
router.post("/", crearFeedback)

/**
 * @swagger
 * /feedback/{_id}:
 *   get:
 *     tags: [Feedback]
 *     summary: Obtener un feedback por su id
 *     description: Get a feedback based on its id
 *     parameters:
 *      - in: path
 *        name: _id
 *        schema: 
 *          type: string
 *          required: true
 *          description: _id , it's bassically the uuid v4 assigned to the feedback object when this is created.
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       400:
 *         description: Parametros Invalidos.
 *       500:
 *         description: Error de servidor
 */
router.get("/:_id", 
    check('_id').custom(feedbackExists),
    obtenerUnFeedbackPorId)

/**
 * @swagger
 * /feedback/athlete/{dni_atleta}:
 *   get:
 *     tags: [Feedback]
 *     summary: Obtener un feedback por el DNI del atleta que lo solicita.
 *     description: Get a feedback based on its athlete Id.
 *     parameters:
 *      - in: path
 *        name: dni_atleta
 *        schema: 
 *          type: integer
 *          required: true
 *          description: dni_atleta , it's the athlete Id which identifies an athlete.
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       400:
 *         description: Parametros Invalidos.
 *       500:
 *         description: Error de servidor
 */
router.get("/athlete/:dni_atleta", obtenerUnFeedbackPorAtleta)

/**
 * @swagger
 * /feedback/coach/{dni_coach}:
 *   get:
 *     tags: [Feedback]
 *     summary: Obtener un feedback por el DNI del coach que debe brindar devolución.
 *     description: Get a feedback based on its coach Id who should give that feedback to the athlete that requested it.
 *     parameters:
 *      - in: path
 *        name: dni_coach
 *        schema: 
 *          type: integer
 *          required: true
 *          description: dni_coach , it's the coach Id which identifies a coach.
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       400:
 *         description: Parametros Invalidos.
 *       500:
 *         description: Error de servidor
 */
router.get("/coach/:dni_coach", obtenerUnFeedbackPorCoach)

//DELETE A FEEDBACK
router.delete("/athlete/:dni_atleta", borrarFeedback)


//ADD AN ARGUMENT TO A CERTAIN FEEDBACK
router.put("/giveFeedback/:dni_atleta", darFeedback)

//CLOSE A CERTAIN FEEDBACK
router.put("/closeFeedback/:dni_atleta", cerrarFeedback)

export default router