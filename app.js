import express from 'express';

//swagger
import {swaggerDocs} from './config/swagger.js'
import atheles from "./routes/athletes.js"
import coaches from "./routes/coaches.js"
import admin from "./routes/admin.js"
import training_class from './routes/class.js'
import feedback from './routes/feedback.js'
import auth from './routes/auth.js'
import { port } from './config.js';

const app = express()

//middleware
app.use(express.json())

//routes
app.use("/athletes", atheles)
app.use("/coaches", coaches)
app.use("/admin", admin)
app.use("/class", training_class)
app.use("/feedback", feedback)
app.use("/auth", auth)

app.get("/" , (req,res) => {
    res.status(200).json({
        status: 'API currently running'
    })
})

app.listen(port, () => {
    console.log(`API Listening on port: ${port}`);
    swaggerDocs(app,port);
})