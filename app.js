import express from 'express'

const app = express()
const port = 4000
import atheles from "./routes/athletes.js"
import coaches from "./routes/coaches.js"
import admin from "./routes/admin.js"

app.use(express.json())

app.use("/athletes", atheles)
app.use("/coaches", coaches)
app.use("/admin", admin)

app.get("/" , (req,res) => {
    res.json({
        status: 'ok'
    })
})

app.listen(port, () => console.log(`API Listening on port: ${port}`))