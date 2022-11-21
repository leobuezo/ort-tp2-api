import express from 'express'
import { loginGoogle, cb, loginGoogleCoach } from '../Services/AuthenticationServices.js'

const router = express.Router()

/**
 * @swagger
 * /auth/v1/login-athlete/google/{accessToken}:
 *   get:
 *     tags: [Authentication]
 *     summary: Inicia la sesion con Google SSO
 *     description: Inicia la sesion del atleta con Google SSO, y en el caso que ese atleta no existe, lo registra y lo devuelva
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
 *         description: Parametros Invalidos.
 *       500:
 *         description: Error de servidor
 */
router.get(
    "/v1/login-athlete/google/:accessToken",
    loginGoogle,
    cb
)

/**
 * @swagger
 * /auth/v1/login-coach/google/{accessToken}:
 *   get:
 *     tags: [Authentication]
 *     summary: Inicia la sesion con Google SSO
 *     description: Inicia la sesion del coach con Google SSO, y en el caso que ese coach no existe, lo registra y lo devuelva
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
 *         description: Parametros Invalidos.
 *       500:
 *         description: Error de servidor
 */
router.get(
    "/v1/login-coach/google/:accessToken",
    loginGoogleCoach,
    cb
)
export default router