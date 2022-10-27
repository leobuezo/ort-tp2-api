import express from 'express'

const router = express.Router()

router.get("/", (req,res) => {
    res.json("Simulo que me traigo todo de la base de Coaches")
})

router.get("/:id", (req,res) => {
    const {id} = req.params
    res.json("Simulo que lo busco en la base de datos y lo retorno de Coaches")
})


export default router