import { MongoClient } from "mongodb"
import { StorageConnection } from "./storage_connection.js"


export class AthleteStorage{
    constructor(){
        this.connection = "mongodb+srv://trainit:comunidadort2022@cluster0.fxvbo5l.mongodb.net/?retryWrites=true&w=majority"
        this.dbName = "TrainIt"
        this.collectionName = "Athlete"
        this.client = new MongoClient(this.connection)
        this.connect()
        this.db = this.client.db(this.dbName)
        this.collection = this.db.collection(this.collectionName)
    }
    async connect(){
        await this.client.connect()
    }
    async crearAtleta(atleta){
        return this.collection.insertOne(atleta)
    }

    async modificarAtleta(){
        throw new Error("Este endpoint todavia no esta disponible")
    }

    async borrarAtleta(atleta){
        await this.collection.deleteMany({id : atleta.id})
    }

    async buscarUnAtleta(identificador){
        return this.collection.find( {id : identificador} ).toArray()
    }

    async buscarAtleta(){
        console.log("busco todo")
        return this.collection.find({}).toArray()
    }

}