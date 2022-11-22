
import { AthleteRepository } from '../Repository/athlete_repository.js'
import { ClassRepository } from '../Repository/class_repository.js'

const repositorio = new AthleteRepository()
export const validateUser = googleId => {

    return repositorio.buscarUnAtleta(googleId).then(usuario => {
        if (usuario.length > 0) {
            return Promise.reject(`El usuario ${usuario[0].nombre} ${usuario[0].apellido} ya existe`)
        }
    })
}

export const validateDni = async dni => {
    return repositorio.buscarUnAtletaPorDni(dni).then(usuario => {
        if (usuario.length === 0) {
            return Promise.reject(`No existe un atleta registrado con el dni ${dni}`)
        }
    })
}

export const userExists = async googleId => {

    return repositorio.buscarUnAtleta(googleId).then(usuario => {
        if (usuario.length === 0) {
            return Promise.reject(`El usuario enviado no existe`)
        }
    })

}

export const validateInfoAthlete = async (req, res, next) => {
    const { googleId, nombre, apellido, dni, rol, fechaNacimiento } = req.body
    const user = await repositorio.buscarUnAtleta(googleId)
    if (user.length > 0) {
        const datosValidados = user[0].datosValidados

        if (datosValidados) {
            return res.status(401).json({ message: "No se pueden modificar los datos que ya fueron cargados." })
        }

        const isInvalid = (!nombre || !apellido || !dni)

        if (isInvalid) {
            return res.status(400).json({
                message: "Alguno de los siguientes datos enviados no son validos. Por favor, revielos:",

                errors: {
                    nombre: nombre,
                    apellido: apellido,
                    dni: dni,
                    rol: rol,
                    fechaNacimiento: fechaNacimiento
                }
            })
        }
        else {
            next()
        }

    } else {
        next()
    }


}

export const addToTeam = async (req, res, next) => {
    const { googleId, codigoTeam } = req.body

    const team = await repositorio.buscarAtletaPorTeam(googleId, codigoTeam)

    const user = await repositorio.buscarUnAtleta(googleId)

    const valido = user[0].edad > 18

    if (team.length === 0) {
        if (valido) {
            next()
        } else {
            return res.status(400).json({
                message: " El atleta no cumple las condiciones para pertenecer al team.",
                errors: {
                    usuario: `${user[0].nombre} ${user[0].apellido}`,
                    edad: user.edad
                }
            })
        }
    } else {
        return res.status(400).json({
            message: "El atleta ya pertenece al team.",
            errors: {
                id: googleId,
                team: codigoTeam
            }
        })
    }
}

export const userIsInClass = async (req, res, next) => {
    const { idClase, googleId } = req.body
    const existe = await repositorio.buscarClaseRegistrada(googleId, idClase)
    if (existe.length > 0) {
        return res.status(400).json({
            message: "El atleta ya esta registrado en esta clase."
        })
    } else {
        next()
    }
}

export const notInTeam = async (req, res, next) => {
    const { googleId } = req.body
    const user = await repositorio.buscarUnAtleta(googleId)
    const { team } = user[0]
    if (!team) {
        return res.status(400).json({
            message: "El atleta no esta registrado en el team"
        })
    } else {
        next()
    }

}