import { MongoClient } from "mongodb"
import {databaseConnection} from '../../config.js'
export class StorageConnection{
    constructor(dbName, collection){
        this.connection = databaseConnection
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