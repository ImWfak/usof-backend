import dotenv from "dotenv"
dotenv.config({path: "./env/.env.database"})

export const DB_NAME = process.env,
    DB_USER = process.env,
    DB_PASSWORD = process.env,
    DB_DIALECT = process.env,
    DB_HOST = process.env
