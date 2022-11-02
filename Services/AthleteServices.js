import { DeprecatedEndpoint } from "../ErrorHandling/Deprecated.js"
import Alumno from "../models/team_athlete.js"
import { AthleteRepository } from "../Repository/athlete_repository.js"

const repositorio = new AthleteRepository()

export const crearAtleta = async (req,res) => {
    const {nombre, apellido, edad, dni, aptoFisico, team, rol, email} = req.body
    const exists = await repositorio.buscarUnAtleta(dni)

    if(exists.length === 0){
        //Aca podria simplificar lo de abajo y llamar a otro lugar que se encargue de esta creacion
        // const responseObject = servicioQueSeEncargue.crearAtleta(nombre, apellido, edad, dni, aptoFisico, team, rol, email)
        const atleta = new Alumno(nombre, apellido, edad, dni, aptoFisico, team, rol, email)
        const responseObject = repositorio.crearAtleta(atleta)
        
        res.status(200).json(responseObject)
    } else {
        res.status(409).json(`Ya existe una persona con el dni ${dni}`)
    }

}


export const obtenerUnAtleta = async (req,res) => {
    const {dni} = req.params
    console.log(dni)
    const responseObject =  await repositorio.buscarUnAtleta(dni)

    responseObject.length ? res.status(200).json(responseObject) : res.status(204).json({message : `No hay persona registradas para el dni ${dni}`}) 

    // persona
    // .then(per => {res.status(200).json(per)})
    // .catch(error => {console.log(error)})

}

export const obtenerAtletas = async (req, res) => {
    console.log("hola")
    const responseObject = await repositorio.buscarAtleta()

    responseObject.length ? res.status(200).json(responseObject) : res.status().json({message : "No hay personas registradas"})
}

export const modificarAtleta = async (req,res) => {
    throw new DeprecatedEndpoint("Este endpoint ya no se usa por favor usar ....")
}

export const borrarAtleta = async (req,res) => {

}