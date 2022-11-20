import { AdminStorage } from "./Storage/admin_storage.js";


export class AdminRepository{
    constructor(){
        this.storage = new AdminStorage()
    }

    registrarAtletaAlTeam(atleta){
        return this.storage.registrarAtletaAlTeam(atleta)
    }

    registrarCoachAlTeam(coach, team){
        return this.storage.registrarCoachAlTeam(atleta,team)
    }

    crearAdmin(admin){
        return this.storage.crearAdmin(admin)
    }

    buscarTodos(){
        return this.storage.buscarTodos()
    }
}