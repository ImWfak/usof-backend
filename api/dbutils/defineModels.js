import {sequelize} from "./connectDB.js"
import {undefUserModel} from "../models/user.model.js"

export const userModel = sequelize.define("user", undefUserModel)
