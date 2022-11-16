import express from 'express'

import {obtenerClases} from '../Services/ClassServices.js';

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *      training_class:
 *          type: object
 *          required: 
 *              - titulo
 *              - cupo
 *              - ubicacion
 *              - diaActividad
 *              - alumnos
 *              - listaEspera
 *              - esCancelada
 *          properties:
 *              titulo:
 *                  type: string
 *                  description: Titulo de la clase
 *              cupo:
 *                  type: int
 *                  description: cupo del atleta
 *              diaActividad:
 *                  type: string
 *                  description: diaActividad del atleta
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
 *              alumnos: string
 *              listaEspera: 0
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
 *              - listaEspera
 *              - esCancelada
 *              - rol
 *              - googleId
 *          properties:
 *              nombre:
 *                  type: string
 *                  description: Nombre del atleta
 *              cupo:
 *                  type: string
 *                  description: cupo del atleta
 *              diaActividad:
 *                  type: integer
 *                  description: diaActividad del atleta       
 *              listaEspera:
 *                  type: integer
 *                  description: listaEspera del atleta
 *              esCancelada:
 *                  type: boolean
 *                  description: Si el atleta cuenta con el apto fisico al dia
 *          example:
 *              nombre: string
 *              cupo: string
 *              diaActividad: 0
 *              listaEspera: 0
 *              esCancelada: false
 *              rol: string
 */

/**
 * @swagger
 *  tags:
 *      name: training_class
 *      description: Manejo de training_class API Train It
 */

/**
 * @swagger
 * /training_class:
 *   get:
 *     tags: [training_class]
 *     summary: Obtener todas las clases
 *     description: Devuelve todos las clases registrados
 *     produces: 
 *      - application/json
 *     responses:
 *       200:
 *         description: Devolucion OK.
 *       500:
 *         description: Error de servidor
 */router.get("/",obtenerClases)



export default router