import {sequelize} from "./connectDB.js"
import {undefUser} from "../models/user.model.js"

export const user = sequelize.define("user", undefUser)
