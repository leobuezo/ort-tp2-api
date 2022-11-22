import { AdminRepository } from "../Repository/admin_repository.js";
import { AthleteRepository } from "../Repository/athlete_repository.js";
import { CoachRepository } from "../Repository/coach_repository.js";

const repositorio = new AdminRepository()
const repositorioAtleta = new AthleteRepository()
const repositorioCoach = new CoachRepository()

export const vaidateAdmin = async (googleId) => {
    const admin = repositorio.buscarAdmin(googleId)
    if (admin.length > 0) {
        return Promise.reject(`Ya existe un adminstrador con el googleId ${googleId}`)
    }
}

export const validarAdminUnico = async () => {
    return repositorio.buscarTodos().then((admin) => {
        if (admin.length > 0) {
            return Promise.reject(`Ya existe un adminstrador`)
        }else{
            return true
        }
    })
}

export const atletaExisteEnTeam = async (req, res, next) => {
    const { googleId, team } = req.body
    
    const atleta = await repositorioAtleta.buscarAtletaPorTeam(googleId, team)

    if (atleta.length > 0) {
        return Promise.reject(`Ya existe el atleta en el team`)
    }

    next()
}

export const atletaValidoParaTeam = async (googleId) => {

    return repositorioAtleta.buscarUnAtleta(googleId).then((atleta) => {
        if (atleta[0].aptoFisico != true) {
            return Promise.reject(`No posee apto fisico al dia`)
        }else{
            return true
        }
    })
}

// export const validarEdad = async (req, res, next) => {
//     const { googleId } = req.body

//     const atleta = await repositorioAtleta.buscarUnAtleta(googleId)

//     const anioNacimiento = new Date(atleta.fechaNacimiento).getFullYear()
//     console.log(anioNacimiento);
//     const anioActual = Date.getFullYear();
//     console.log(anioNacimiento, anioActual);
//     if ((anioActual - anioNacimiento) < 18) {
//         return Promise.reject(`Ya existe el atleta en el team`)
//     }    

//     next()
// }

export const coachExisteEnTeam = async (req, res, next) => {
    const { googleId, team } = req.body
    const coach = repositorioCoach.buscarCoachPorTeam(googleId, team)
    if (coach.length > 0) {
        return Promise.reject(`Ya existe el coach en el team`)
    }
    next()
}