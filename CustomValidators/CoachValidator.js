
import {CoachRepository} from "../Repository/coach_repository.js"

const repositorioCoach = new CoachRepository()

export const validateCoach = async dni => {

    return repositorioCoach.buscarCoachPorDni(dni).then(coach => {
        console.log('muestro coach: ', coach.length)
        if (coach.length === 0) {
            return Promise.reject(`No existe un coach registrado con el dni ${dni}`)
        }    
    })
}

export const userCoachExists = googleId => {

    return repositorioCoach.buscarUnCoach(googleId).then(usuario => {
        if (usuario.length === 0) {
            return Promise.reject(`El usuario enviado no existe`)
        }
    })

}

export const validadorInformacionCoach = async (req, res, next) => {
    const { googleId, nombre, apellido, fechaNacimiento, dni, rol } = req.body
    const coach = await repositorioCoach.buscarUnCoach(googleId)
    if(coach){
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
        return res.status(400).json({message: "El coach no existe."})
    }
    

}