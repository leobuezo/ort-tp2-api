import { MongoClient } from "mongodb"

export class StorageConnection{
    constructor(dbName, collection){
        this.connection = "mongodb+srv://trainit:comunidadort2022@cluster0.fxvbo5l.mongodb.net/?retryWrites=true&w=majority"
        this.dbName = dbName
        this.collectionName = collection
        this.client = new MongoClient(this.connection)
        this.connect()
        this.db = this.client.db(this.dbName)
        this.collection = this.db.collection(this.collectionName)
    }

    async connect(){
        await this.client.connect()
    }

    getCollection(){
        return this.collection
    }
}