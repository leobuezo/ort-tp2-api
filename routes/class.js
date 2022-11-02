import express from 'express'
import { NotImplemented } from '../ErrorHandling/NotImplementedApi.js'
import { ClassRepository } from '../Repository/class_repository.js'

const router = express.Router()

const repositorio = new ClassRepository()

//
router.put("/:id", (req,res) => {

    throw new NotImplemented("El endpoint no esta siendo implementado al momento")

    //Agregar el metodo buscarClase dentro del repositorio. Revisar funcionalidades de la clase

    const {id} = req.body

    const clase = repositorio.buscarClase(id)
    
    clase.length === 0 ? res.status(404).json(`No existe la clase buscada`) : res.status(200).json(`Se cancelo la clase con exito`)
    
})

export default router