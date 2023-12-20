import {
    SERVER_PORT,
    SERVER_HOST,
    LOG_LEVEL
} from "../configs/server.config.js";
import express from "express"
import morgan from "morgan"

const app = express()

app.disable("x-powered-by")
app.use(morgan(LOG_LEVEL))

app.listen(SERVER_PORT || 3000, function(err) {
    if (err)
        throw err
    console.log("Server at http://" + SERVER_HOST + ":" + SERVER_PORT)
})
