import express from 'express'
import { loginGoogle, cb } from '../Services/AuthenticationServices.js'

const router = express.Router()

/**
 * @swagger
 * /auth/v1/login/google/{accessToken}:
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
    "/v1/login/google/:accessToken",
    loginGoogle,
    cb
)

export default router