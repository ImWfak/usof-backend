import express from "express"
import {param} from "express-validator"
import {userController} from "../controllers/user.controller.js"
import {idValidator} from "../validators/common.validator.js"
import {
    userEmailRegex,
    userPhoneNumberRegex
} from "../regexes/user.regexex.js"

const userRouter = express.Router()
userRouter.get(
    "/getById/:id",
    idValidator,
    userController.getUserById
)
userRouter.get(
    "/getByEmail/:email",
    param("email").isString().exists().matches(userEmailRegex).withMessage("Wrong user email value"),
    userController.getUserByEmail
)
userRouter.get(
    "/getByPhoneNumber/:phoneNumber",
    param("phoneNumber").isString().exists().matches(userPhoneNumberRegex).withMessage("Wrong user phoneNumber value"),
    userController.getUserByPhoneNumber
)
userRouter.get(
    "/getByLogin/:login",
    param("login").isString().exists().withMessage("Wrong user login value"),
    userController.getUserByLogin
)
userRouter.get(
    "/getAll",
    userController.getAllUsers
)

export default userRouter