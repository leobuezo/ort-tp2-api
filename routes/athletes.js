import express from 'express'
import { AthleteRepository } from '../Repositorio/athlete_repository.js'

const router = express.Router()

 router.get("/", async (req,res) => {
     const repo = new AthleteRepository()
     const atletas = await repo.buscarAtleta()
     res.json(atletas)
})

router.get("/:id", async function(req,res) {
    const {id} = req.params
    const repo = await (new AthleteRepository()).buscarUnAtleta(id)
    res.json(repo)
})

export default router