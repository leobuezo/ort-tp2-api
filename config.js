import {config} from 'dotenv'

config()

const databaseConnection = process.env.DB_CONNECTION 
const port = process.env.PORT

export {databaseConnection, port}