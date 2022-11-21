import express from 'express'
import { body, check } from 'express-validator'
import { userExists } from '../CustomValidators/AthleteValidator.js'
import { userCoachExists } from '../CustomValidators/CoachValidator.js'
import FeedbackRepository from '../Repository/feedback_respository.js'
import { obtenerFeedbacks, obtenerFeedbacksPorAtleta, obtenerFeedbacksPorCoach, obtenerUnFeedbackPorId, borrarFeedback, crearFeedback, darFeedback, cerrarFeedback } from '../Services/FeedbackServices.js'

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
 *              estado:
 *                  type: string
 *                  description: estado del feedback (pending, completed, closed)
 *              feedbackContent:
 *                  type: string
 *                  description: devolución que brinda el coach al atleta que le pidió feedback.
 *          example:
 *              dni_atleta: 12345685
 *              titulo_clase: Clase de Funcional
 *              dni_coach: 443337777
 *              estado: completed
 *              feedbackContent: El alumno viene mostrando un excelente progreso en los burpees. La técnica es cada vez mejor, le falta completar con el salto al final.
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
router.post("/", 
body('dni_atleta').custom(userExists),
body('dni_coach').custom(userCoachExists),
crearFeedback)

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
router.get("/athlete/:dni_atleta", obtenerFeedbacksPorAtleta)

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
router.get("/coach/:dni_coach", obtenerFeedbacksPorCoach)

/**
 * @swagger
 * /feedback/{dni_atleta}:
 *   delete:
 *     tags: [Feedback]
 *     summary: Borrar un feedback pasándole como parámetro el DNI de un atleta.
 *     description: Delete a feddback by athlete Id.
 *     responses:
 *       200:
 *         description: OK.
 *       500:
 *         description: Error de servidor
 */
router.delete("/athlete/:dni_atleta", borrarFeedback)

/**
 * @swagger
 * /feedback/give-feedback/{dni_atleta}:
 *   put:
 *     tags: [Feedback]
 *     summary: Asignar un contenido de devolución al feedback solicitado por un atleta.
 *     description: Assign a content for the feedback requested by an athlete. The coach that has been requested to give it is who have to add that feedback content.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           devolucion: string
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       500:
 *         description: Error de servidor
 */
router.put("/give-feedback/:dni_atleta", darFeedback)

/**
 * @swagger
 * /feedback/close-feedback/{dni_atleta}:
 *   put:
 *     tags: [Feedback]
 *     summary: Cambiar el esteado de un feedback cuando el atleta lo marque como leío.
 *     description: Move a feedback state to closed when its athlete mark this as read.
 *     responses:
 *       200:
 *         description: OK.
 *       500:
 *         description: Error de servidor
 */
router.put("/close-feedback/:dni_atleta", cerrarFeedback)

export default router