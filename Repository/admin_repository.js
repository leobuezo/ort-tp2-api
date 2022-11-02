import { AdminStorage } from "./Storage/admin_storage.js";


export class AdminRepository{
    constructor(){
        this.storage = new AdminStorage()
    }

    registrarAtleta(atleta,team){
        return this.storage.registrarAtleta(atleta,team)
    }

    crearAdmin(admin){
        return this.storage.crearAdmin(admin)
    }
}