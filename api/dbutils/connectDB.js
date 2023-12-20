import {Sequelize} from "sequelize"

import {
    DB_NAME,
    DB_USER,
    DB_PASSWORD,
    DB_DIALECT,
    DB_HOST
} from "../../configs/database.config.js"

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
    dialect: DB_DIALECT,
    host: DB_HOST,
    define: {
        freezeTableName: true,
        timestamps: false
    }
})

sequelize.authenticate().then(function() {
    console.log("Sequelize connected to database")
}).catch(function(err) {
    console.log("Sequelize can`t connect to database")
})

sequelize.sync({alter: true}).then(function() {
    console.log("Database has been updated")
})
