const express = require("express")
const cors = require("cors")
const config = require("./config/index")
const infoRouter = require("./routes/info")
const errorHandler = require("./middleware/errorhandler")

const app = express()

app.use(express.json())
app.use(cors({ origin: true }))

app.use("/info", infoRouter)

app.use(errorHandler)

module.exports = app
