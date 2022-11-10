import { AdminRepository } from "../Repository/admin_repository.js";

const repositorio = new AdminRepository()

export const vaidateAdmin = async (dni) => {
    const admin = repositorio.buscarAdmin(dni)
    if (admin.length > 0) {
        return Promise.reject(`Ya existe un adminstrador con el dni ${dni}`)
    }
}

export const existeEnTeam = async (req, res, next) => {
    const {dni, team} = req.body
    console.log(dni)
    console.log(team)

    next()
}