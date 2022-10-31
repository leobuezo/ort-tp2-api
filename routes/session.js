import express from "express"

const router = express.Router()

router.post("/IniciarSesion/", (req,res) => {
    const {email, contrasenia} = req.body

    //simulo que busco dentro de la base que coincidan estos datos

    res.status(200).send(true)

})

export default router