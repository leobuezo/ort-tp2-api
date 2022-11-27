import express from 'express'
import { body, check } from 'express-validator'
import { obtenerClases, crearNuevaClase, obtenerClasesPorNombre, registrarAlumnoAclases, bajaDeAtleta, cancelarClases, buscarPorId } from '../Services/ClassServices.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *      Class:
 *          type: object
 *          required: 
 *              - titulo
 *              - cupo
 *              - ubicacion
 *              - diaActividad
 *              - coach
 *          properties:
 *              titulo:
 *                  type: string
 *                  description: Titulo de la clase
 *              cupo:
 *                  type: integer
 *                  description: cupo del atleta
 *              diaActividad:
 *                  type: string
 *                  description: diaActividad del atleta
 *              coach:
 *                  type: object
 *                  description: coach de la clase
 *              alumnos:
 *                  type: array
 *                  description: E-Mail del atleta             
 *              listaEspera:
 *                  type: array
 *                  description: listaEspera del atleta
 *              esCancelada:
 *                  type: boolean
 *                  description: Si el atleta cuenta con el apto fisico al dia
 *          example:
 *              nombre: string
 *              cupo: 0
 *              diaActividad: 0
 *              coach: object
 *              alumnos: array
 *              listaEspera: array
 *              esCancelada: false
 */

/**
 * @swagger
 * components:
 *   schemas:
 *      ClassRegistration:
 *          type: object
 *          required: 
 *              - nombre
 *              - cupo
 *              - diaActividad
 *              - coach
 *          properties:
 *              titulo:
 *                  type: string
 *                  description: Nombre de la clase
 *              cupo:
 *                  type: integer
 *                  description: cupo del atleta
 *              diaActividad:
 *                  type: string
 *                  description: diaActividad del atleta       
 *              coach:
 *                  type: object
 *                  description: coach de la clase
 *              alumnos:
 *                  type: array
 *                  description: E-Mail del atleta             
 *              listaEspera:
 *                  type: array
 *                  description: listaEspera del atleta
 *              esCancelada:
 *                  type: boolean
 *                  description: Si el atleta cuenta con el apto fisico al dia
 *          example:
 *              nombre: string
 *              cupo: string
 *              diaActividad: 0
 *              coach: object
 */

/**
 * @swagger
 *  tags:
 *      name: Class
 *      description: Manejo de training_class API Train It
 */

/**
 * @swagger
 * /training_class:
 *   get:
 *     tags: [Class]
 *     summary: Obtiene todas las clases
 *     description: Devuelve todos las clases registradas
 *     produces: 
 *      - application/json
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       500:
 *         description: Error de servidor
 */router.get("/clases", obtenerClases)

/**
 * @swagger
 * /training_class:
 *   post:
 *     tags: [Class]
 *     summary: Crea una nueva clases
 *     description: Crea una clase a partir de los datos enviados por parametros
 *     requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  $ref : '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       500:
 *         description: Error de servidor
 */router.post("/clase",
        body('titulo').exists().isString(),
        body('diaActividad').exists().isString(),
        body('cupo').exists().isNumeric(),
        body('ubicacion').exists(),
        body('coachId').exists(),
        crearNuevaClase)

/**
 * @swagger
 * /training_class/alumno:
 *   put:
 *     tags: [Class]
 *     summary: Registra un nueva Alumno
 *     description: Inserta un atleta en la lista de alumnos o lista de espera
 *     requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  $ref : '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       500:
 *         description: Error de servidor
 */router.put("/alumno",
                body('claseId').exists().isString(),
                body('alumnoId').exists().isString(),
                registrarAlumnoAclases)


/**
 * @swagger
 * /training_class/atleta:
 *   delete:
 *     tags: [Class]
 *     summary: Da de baja a un alumno de clase
 *     description: Da de baja a un atleta en la lista de alumnos y gestiona el ingreso de la primera persona en lista de espera a la clase
 *     requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  $ref : '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       500:
 *         description: Error de servidor
 */router.delete("/atleta",
                        body('claseId').exists().isString(),
                        body('atletaId').exists().isString(),
                        bajaDeAtleta)


/**
 * @swagger
 * /training_class/cancelada:
 *   put:
 *     tags: [Class]
 *     summary: Cancela una clase
 *     description: Recibe el identificador de una clase y se pasa a estado cancelado
 *     requestBody:
 *      required: true
 *      content: 
 *          application/json:
 *              schema:
 *                  $ref : '#/components/schemas/Class'
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       500:
 *         description: Error de servidor
 */router.put("/cancelada",
                                body('claseId').exists().isString(),
                                cancelarClases)


/**
 * @swagger
 * /training_class/clase/{nombre}:
 *   get:
 *     tags: [Class]
 *     summary: Obtiene una clase por nombre
 *     description: Devuelve una clase registrada filtrada por nombre
*     parameters:
 *      - in: path
 *        name: nombre
 *        schema: 
 *          type: string
 *          required: true
 *          description: nombre correspondiente a la clase a buscar 
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       500:
 *         description: Error de servidor
 */
router.get("/clase/:nombre",
        check('nombre').exists().isString(),
        obtenerClasesPorNombre)

router.get("/clasesDeAtleta/:googleId",
        buscarPorId
)

export default router