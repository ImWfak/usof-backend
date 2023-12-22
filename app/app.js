//========================================GET SERVER
import {
    SERVER_PORT,
    SERVER_HOST,
    LOG_LEVEL
} from "../configs/server.config.js"
import express from "express"
const app = express()

//========================================OTHER
import morgan from "morgan"
app.disable("x-powered-by")        //disable express tag
app.use(express.json())                   //enable using json
app.use(morgan(LOG_LEVEL))                //enable logging

//========================================ROUTERS
import userRouter from "../api/routers/user.router.js"
app.use("/api", userRouter)

//========================================DATA BASE
import {sequelize} from "../api/dbutils/connectDB.js"
import {makeAssociations} from "../api/dbutils/makeAssociations.js"
await sequelize.authenticate().then(function() {
    console.log("Sequelize connected to database")
}).catch(function(err) {
    console.log("Sequelize can`t connect to database")
})
await sequelize.sync({alter: true}).then(function() {
    console.log("Database has been updated")
})
await makeAssociations()

//========================================START SERVER
app.listen(SERVER_PORT, function(err) {
    if (err)
        throw err
    console.log("Server at http://" + SERVER_HOST + ":" + SERVER_PORT)
})
