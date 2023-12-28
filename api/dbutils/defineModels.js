import {sequelize} from "./connectDB.js"
import {undefUserModel} from "../models/user.model.js"

export const userModel = await sequelize.define("user", undefUserModel)
