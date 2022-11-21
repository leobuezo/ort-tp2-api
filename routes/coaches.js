import express, { Router } from 'express'
import { body, check } from 'express-validator'
import { borrarCoach, crearCoach, obtenerCoaches, obtenerUnCoach, registrarse } from '../Services/CoachServices.js'
import { userExists, validateCoach } from '../CustomValidators/CoachValidator.js'

const router = express.Router()
/**
 * @swagger
 * components:
 *   schemas:
 *      Coach:
 *          type: object
 *          required: 
 *              - nombre
 *              - apellido
 *              - email
 *              - dni
 *              - rol
 *              - team
 *              - fechaNacimiento
 *              - googleId
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: Nombre del coach
 *              apellido:
 *                  type: string
 *                  description: Apellido del coach
 *              email:
 *                  type: string
 *                  description: E-Mail del coach 
 *              dni:
 *                  type: integer
 *                  description: DNI del coach  
 *              rol:
 *                  type: string
 *                  description: Rol del coach
 *              team:
 *                  type: string
 *                  description: Nombre del team al que el atleta este registrado           
 *              fechaNacimiento:
 *                  type: integer
 *                  description: Edad del coach
 *              googleId:
 *                  type: string
 *                  description: Id correspondiente a google
 *          example:
 *              nombre: string
 *              apellido: string
 *              email: string
 *              dni: 0
 *              rol: string
 *              team: string
 *              fechaNacimiento: 0
 *              googleId: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *      CoachRegistration:
 *          type: object
 *          required: 
 *              - nombre
 *              - apellido
 *              - email
 *              - dni
 *              - rol
 *              - team
 *              - fechaNacimiento
 *              - googleId
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: Nombre del coach
 *              apellido:
 *                  type: string
 *                  description: Apellido del coach
 *              email:
 *                  type: string
 *                  description: E-Mail del coach 
 *              dni:
 *                  type: integer
 *                  description: DNI del coach  
 *              rol:
 *                  type: string
 *                  description: Rol del coach
 *              team:
 *                  type: string
 *                  description: Nombre del team al que el atleta este registrado           
 *              fechaNacimiento:
 *                  type: integer
 *                  description: Edad del coach
 *              googleId:
 *                  type: string
 *                  description: Id correspondiente a google
 *          example:
 *              nombre: string
 *              apellido: string
 *              email: string
 *              dni: 0
 *              rol: string
 *              team: string
 *              fechaNacimiento: 0
 *              googleId: string
 */

/**
 * @swagger
 *  tags:
 *      name: Coach
 *      description: Manejo de Coaches API Train It
 */

//OBTENER UN COACH
/**
 * @swagger
 * /coaches/{googleId}:
 *   get:
 *     tags: [Coach]
 *     summary: Obtener un coach por su id
 *     description: Get a coach based on their id
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
    obtenerUnCoach
)

//OBTENER TODOS LOS COACHES
/**
 * @swagger
 * /coaches:
 *   get:
 *     tags: [Coach]
 *     summary: Obtener todos los coaches
 *     description: Returns all coaches
 *     produces: 
 *      - application/json
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       500:
 *         description: Error de servidor
 */
router.get("/",
    obtenerCoaches
)

//CREAR UN COACH
/**
 * @swagger
 * /coaches:
 *   post:
 *     tags: [Coach]
 *     summary: Crear un coach nuevo
 *     description: Creates a new Coach
 *     requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  $ref : '#/components/schemas/Coach'
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
 check('googleId').custom(validateCoach),
 crearCoach
)

//BORRAR UN COACH
/**
 * @swagger
 * /coaches/{googleId}:
 *   delete:
 *     tags: [Coach]
 *     summary: Borrar un coach
 *     description: Delete a coach based on their id
 *     parameters:
 *      - in: path
 *        name: googleId
 *        schema: 
 *          type: string
 *          required: true
 *          description: Id correspondiente a la cuenta de google 
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       500:
 *         description: Error de servidor
 */
 router.delete("/:googleId",
 check('googleId').custom(userExists),
 borrarCoach
)

//TERMINAR DE REGISTRARSE
/**
 * @swagger
 * /coaches/finalizar-registracion:
 *   put:
 *     tags: [Coach]
 *     summary: Modificar datos del coach
 *     description: Modifica los datos del coach luego de registrarse con Google
 *     requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  $ref : '#/components/schemas/CoachRegistration'
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       500:
 *         description: Error de servidor
 */
router.put("/finalizar-registracion",
    body('googleId').custom(userExists),
    registrarse
)

//CREAR CLASE


export default router