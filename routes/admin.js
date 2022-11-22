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
 *              edad: 0
 *              email: string
 */

/**
 * @swagger
 * components:
 *   schemas:
 *      RegistrarAtletaTeam:
 *          type: object
 *          required: 
 *              - accessToken
 *          properties:
 *              googleId:
 *                  type: string
 *                  description: Id correspondiente a google
 *              Team: 
 *                  type: string
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
 * /Admin/registrar-atleta:
 *   put:
 *     tags: [Admin]
 *     summary: Registrar un Atleta a un Team
 *     description: Agrega un Atleta a un Team
 *     requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  $ref : '#/components/schemas/RegistrarAtletaTeam'
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
    check("googleId").custom(atletaValidoParaTeam),
    crearAtleta)

//REGISTER A COACH TO THE TEAM  DEPRECATED. USE POST /COACHES TO CREATE A COACH
/**
 * @swagger
 * /Admin/registrar-coach:
 *   put:
 *     tags: [Admin]
 *     summary: Registrar un Coach a un Team
 *     description: Agrega un Coach a un Team
 *     requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  $ref : '#/components/schemas/RegistrarAtletaTeam'
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
router.put("/registrar-coach" , 
    //modificar metodo para que busque en coachs
    body('googleId').custom(userCoachExists),
    coachExisteEnTeam,
    crearCoach)

//CREATE AN ADMIN
/**
 * @swagger
 * /Admin/{AccessToken}:
 *   get:
 *     tags: [Admin]
 *     summary: Inicia la sesion con Google SSO
 *     description: Inicia la sesion del Admin con Google SSO, y en el caso que ese Admin no existe, lo registra y lo devuelva
 *     parameters:
 *      - in: path
 *        name: Access Token
 *        schema: 
 *          type: string
 *          required: true
 *          description: Access Token obtenido por Google 
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       400:
 *         description: Parametros invalidos.
 *       500:
 *         description: Error de servidor.
 */
router.get("/:accessToken" ,
    // body('googleId').custom(vaidateAdmin),
    // body('email').isEmail(),
    check("accessToken").custom(validarAdminUnico),
    crearAdmin)  


//router.get("/pendientes", usuariosPendientes)

export default router