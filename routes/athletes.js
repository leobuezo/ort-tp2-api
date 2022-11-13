import express from 'express'
import { body, check } from 'express-validator'
import { AthleteRepository } from '../Repository/athlete_repository.js'
import { obtenerAtletas, obtenerUnAtleta, crearAtleta, borrarAtleta, agregarAlTeam, modificarAtleta } from '../Services/AthleteServices.js'

//Import this callback to validate if user exists or not
import { validateUser, userExists, validateInfoAthlete } from '../CustomValidators/AthleteValidator.js'

const router = express.Router()
const respositorio = new AthleteRepository()

/**
 * @swagger
 * components:
 *   schemas:
 *      Athlete:
 *          type: object
 *          required: 
 *              - nombre
 *              - apellido
 *              - dni
 *              - email
 *              - edad
 *              - aptoFisico
 *              - rol
 *              - googleId
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: Nombre del atleta
 *              apellido:
 *                  type: string
 *                  description: Apellido del atleta
 *              dni:
 *                  type: integer
 *                  description: DNI del atleta
 *              email:
 *                  type: string
 *                  description: E-Mail del atleta             
 *              edad:
 *                  type: integer
 *                  description: Edad del atleta
 *              aptoFisico:
 *                  type: boolean
 *                  description: Si el atleta cuenta con el apto fisico al dia
 *              team:
 *                  type: string
 *                  description: Nombre del team al que el atleta este registrado 
 *              googleId:
 *                  type: string
 *                  description: Id correspondiente a google
 *          example:
 *              nombre: string
 *              apellido: string
 *              dni: 0
 *              email: string
 *              edad: 0
 *              aptoFisico: false
 *              rol: string
 *              team: string
 *              googleId: string
 */

/**
 * @swagger
 *  tags:
 *      name: Athlete
 *      description: Manejo de Atletas API Train It
 */

/**
 * @swagger
 * /athletes:
 *   get:
 *     tags: [Athlete]
 *     summary: Obtener todos los atletas
 *     description: Devuelve todos los atletas registrados
 *     produces: 
 *      - application/json
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       500:
 *         description: Error de servidor
 */
router.get("/",
    obtenerAtletas)

/**
 * @swagger
 * /athletes/{googleId}:
 *   get:
 *     tags: [Athlete]
 *     summary: Obtener un atleta por su id
 *     description: Get an athlete based on their id
 *     parameters:
 *      - in: path
 *        name: googleId
 *        schema: 
 *          type: string
 *          required: true
 *          description: ID correspondiente a la cuenta de google 
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       400:
 *         description: Parametros Invalidos.
 *       500:
 *         description: Error de servidor
 */
router.get("/:googleId",
    check('googleId').custom(userExists),
    obtenerUnAtleta)

/**
 * @swagger
 * /athletes:
 *   post:
 *     tags: [Athlete]
 *     summary: Crear un atleta nuevo
 *     description: Creates a new Athlete
 *     requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  $ref : '#/components/schemas/Athlete'
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
    check('edad').toInt(),
    check('googleId').custom(validateUser),
    body('email').isEmail(),
    body('aptoFisico').isBoolean(),
    crearAtleta)

/**
 * @swagger
 * /athletes/{id}:
 *   delete:
 *     tags: [Athlete]
 *     summary: Borrar un atleta
 *     description: Delete an athlete based on their id
 *     parameters:
 *      - in: path
 *        name: dni
 *        schema: 
 *          type: integer
 *          required: true
 *          description: dni atleta 
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       500:
 *         description: Error de servidor
 */
router.delete("/:googleId",
    check('googleId').custom(userExists),
    borrarAtleta)

/**
 * @swagger
 * /athletes/{id}:
 *   put:
 *     tags: [Athlete]
 *     summary: Agregar a un atleta a un team
 *     description: Adds an athlete to a team
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       500:
 *         description: Error de servidor
 */
router.put("/agregarTeam",
    //    (req, res) => validateTeam(req,res),
    check('googleId').custom(userExists),
    agregarAlTeam)

/**
 * @swagger
 * /athletes/{id}:
 *   put:
 *     tags: [Athlete]
 *     summary: Modificar datos del atleta
 *     description: Modify data from an athlete
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       500:
 *         description: Error de servidor
 */

router.put("/finalizarRegistracion",
    body('googleId').custom(userExists),
    body('aptoFisico').isBoolean(),
    validateInfoAthlete,
    modificarAtleta)

export default router