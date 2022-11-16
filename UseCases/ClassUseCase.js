import { ClassRepository } from "../Repository/class_repository.js";
import { usaCaseError } from "../Repository/helpers/ErrorHelper.js";

const repositorio= new ClassRepository();

export const buscarClases= async (req, res) => {
    try{
        const clases=  await repositorio.buscarClases();
    }catch(error){
        throw new ClassUseCaseError(usaCaseError + error);
    }
    return clases;
}