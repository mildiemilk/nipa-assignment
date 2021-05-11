const express = require("express")
const cors = require("cors")
const config = require("./config/index")
const infoRouter = require("./routes/info")

const app = express()
app.use(express.json())
app.use(cors({ origin: true }))

app.use("/info", infoRouter)

module.exports = app
