import express from 'express'
import { loginGoogle, cb, loginGoogleCoach } from '../Services/AuthenticationServices.js'

const router = express.Router()

/**
 * @swagger
 * /auth/v1/login-athlete/google/{accessToken}:
 *   get:
 *     tags: [Authentication]
 *     summary: Iniciar sesion por Google SSO
 *     description: Iniciar sesion por Google SSO
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
 *     summary: Iniciar sesion por Google SSO
 *     description: Iniciar sesion por Google SSO
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