import dotenv from "dotenv"
dotenv.config({path: "./env/.env.server"})

export const {
    SERVER_PORT,
    SERVER_HOST,
    LOG_LEVEL
} = process.env
