import express from 'express'
import { body, check } from 'express-validator'
import { obtenerAtletas, obtenerUnAtleta, crearAtleta, borrarAtleta, finalizazrRegistracion, unirseAClase, darseDeBajaClase } from '../Services/AthleteServices.js'

//Import this callback to validate if user exists or not
import { validateUser, userExists, validateInfoAthlete } from '../CustomValidators/AthleteValidator.js'

const router = express.Router()
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
 *              - fechaNacimiento
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
 *              fechaNacimiento:
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
 *              fechaNacimiento: 0
 *              aptoFisico: false
 *              rol: string
 *              team: string
 *              googleId: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *      AthleteRegistration:
 *          type: object
 *          required: 
 *              - nombre
 *              - apellido
 *              - dni
 *              - fechaNacimiento
 *              - aptoFisico
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
 *              fechaNacimiento:
 *                  type: integer
 *                  description: Edad del atleta
 *              aptoFisico:
 *                  type: boolean
 *                  description: Si el atleta cuenta con el apto fisico al dia
 *              googleId:
 *                  type: string
 *                  description: Id correspondiente a google
 *          example:
 *              nombre: string
 *              apellido: string
 *              dni: 0
 *              fechaNacimiento: 0
 *              aptoFisico: false
 *              googleId: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *      AthleteClassSchema:
 *          type: object
 *          required: 
 *              - googleId
 *              - classId
 *          properties:
 *              googleId:
 *                  type: string
 *                  description: Id correspondiente a google
 *              classId:
 *                  type: string
 *                  description: Id correspondiente de la clase
 *          example:
 *              googleId: string
 *              classId: string
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
    obtenerAtletas
)

/**
 * @swagger
 * /athletes/{googleId}:
 *   get:
 *     tags: [Athlete]
 *     summary: Obtener un atleta por su id
 *     description: Devuelve un solo atleta en base al Google Id enviado
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
    obtenerUnAtleta
)

/**
 * @swagger
 * /athletes:
 *   post:
 *     tags: [Athlete]
 *     summary: Crear un atleta nuevo
 *     description: Crea un nuevo atleta
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
    check('googleId').custom(validateUser),
    body('email').isEmail(),
    body('aptoFisico').isBoolean(),
    crearAtleta
)

/**
 * @swagger
 * /athletes/{googleId}:
 *   delete:
 *     tags: [Athlete]
 *     summary: Borrar un atleta
 *     description: Borra un atleta de la app en base a su Google Id
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
    borrarAtleta
)

/**
 * @swagger
 * /athletes/finalizar-registracion:
 *   put:
 *     tags: [Athlete]
 *     summary: Modificar datos del atleta
 *     description: Completa la registracion del atleta y actualiza sus datos
 *     requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  $ref : '#/components/schemas/AthleteRegistration'
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       500:
 *         description: Error de servidor
 */
router.put("/finalizar-registracion",
    body('googleId').custom(userExists),
    body('aptoFisico').isBoolean(),
    validateInfoAthlete,
    finalizazrRegistracion
)

/**
* @swagger
* /athletes/anotarse-a-clase:
*   put:
*     tags: [Athlete]
*     summary: Anotar a un atleta a una clase
*     description: Anotar al atleta a una clase en particular
*     requestBody:
*      required: true
*      content: 
*          application/json:
*              schema:
*                  $ref : '#/components/schemas/AthleteClassSchema'
*     responses:
*       200:
*         description: Devolucion OK.
*       500:
*         description: Error de servidor
*/
router.put("/anotarse-a-clase",
    body('googleId').custom(userExists),
    unirseAClase
)


/**
* @swagger
* /athletes/darse-de-baja-clase:
*   put:
*     tags: [Athlete]
*     summary: Anotar a un atleta a una clase
*     description: Dar de baja a un atleta a una clase en particular
*     requestBody:
*      required: true
*      content: 
*          application/json:
*              schema:
*                  $ref : '#/components/schemas/AthleteClassSchema'
*     responses:
*       200:
*         description: Devolucion OK.
*       500:
*         description: Error de servidor
*/
router.put("/darse-de-baja-clase",
    body('googleId').custom(userExists),
    darseDeBajaClase
)

export default router