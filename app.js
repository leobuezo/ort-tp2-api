import express from 'express'

const app = express()
const port = 3000
import atheles from "./routes/athletes.js"
import coaches from "./routes/coaches.js"
import admin from "./routes/admin.js"
import session from "./routes/session.js"
import router from './routes/class.js'

app.use(express.json())

app.use("/athletes", atheles)
app.use("/coaches", coaches)
app.use("/admin", admin)
app.use("/session", session)
app.use("/class", router)

app.get("/" , (req,res) => {
    res.json({
        status: 'API currently running'
    })
})

app.listen(port, () => console.log(`API Listening on port: ${port}`))