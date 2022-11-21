import express from 'express'
import { body, check } from 'express-validator'
import { atletaValidoParaTeam, atletaExisteEnTeam, coachExisteEnTeam, validarAdminUnico} from '../CustomValidators/AdminValidator.js'
import { userExists } from '../CustomValidators/AthleteValidator.js'
import { userCoachExists } from '../CustomValidators/CoachValidator.js'
import { AdminRepository } from '../Repository/admin_repository.js'
import { AthleteRepository } from '../Repository/athlete_repository.js'
import { CoachRepository } from '../Repository/coach_repository.js'
import { crearAtleta, crearCoach, crearAdmin } from '../Services/AdminServices.js'

const router = express.Router()

const repositorioCoach = new CoachRepository()
const repositorioAtleta = new AthleteRepository()
const repositorio = new AdminRepository()
//const repositorioTeam = new TeamRepository()

router.use(express.json())

/**
 * @swagger
 * components:
 *   schemas:
 *      Admin:
 *          type: object
 *          required: 
 *              - nombre
 *              - apellido
 *              - edad
 *              - email
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: Nombre del admin
 *              apellido:
 *                  type: string
 *                  description: Apellido del admin
 *              edad:
 *                  type: int
 *                  description: Edad del admin
 *              email:
 *                  type: string
 *                  description: Edad del admin
 *          example:
 *              nombre: string
 *              apellido: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *      AdminRegistration:
 *          type: object
 *          required: 
 *              - accessToken
 *          properties:
 *              googleId:
 *                  type: string
 *                  description: Id correspondiente a google
 *              Team: 
 *                  type: object
 *                  description: Team donde se quiere agregar el Atleta
 *          example:
 *              googleId: string
 *              Team: Object
 */
/**
 * @swagger
 *  tags:
 *      name: Admin
 *      description: Manejo de Adimns API Train It
 */


//REGISTER AN ATHLETE TO THE TEAM
/**
 * @swagger
 * /registrar-atleta:
 *   put:
 *     tags: [Admin]
 *     summary: Registrar un Atleta a un Team
 *     description: Agrega un Atleta a un Team
 *     requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  $ref : '#/components/schemas/Admin'
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
router.put("/registrar-atleta", 
    body('googleId').custom(userExists),
    atletaExisteEnTeam,
    atletaValidoParaTeam,
    // validarEdad,
    crearAtleta)

//REGISTER A COACH TO THE TEAM  DEPRECATED. USE POST /COACHES TO CREATE A COACH
/**
 * @swagger
 * /registrar-coach:
 *   put:
 *     tags: [Admin]
 *     summary: Registrar un Coach a un Team
 *     description: Agrega un Coach a un Team
 *     requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  $ref : '#/components/schemas/Admin'
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
router.post("/registrar-coach" , 
    //modificar metodo para que busque en coachs
    body('googleId').custom(userCoachExists),
    coachExisteEnTeam,
    crearCoach)

//CREATE AN ADMIN
/**
 * @swagger
 * /:
 *   get:
 *     tags: [Admin]
 *     summary: Recibir/Registrar un Admin 
 *     description: Registra un Admin si no existe y lo devuelve
 *     requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  $ref : '#/components/schemas/Admin'
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
router.get("/:accessToken" ,
    // body('googleId').custom(vaidateAdmin),
    // body('email').isEmail(),
    validarAdminUnico,
    crearAdmin)  


//router.get("/pendientes", usuariosPendientes)

export default router