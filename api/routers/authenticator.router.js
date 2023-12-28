import express from "express"
import {authenticatorController} from "../controllers/authenticator.controller.js"
import {
    idValidator,
    dateValidator
} from "../validators/common.validator.js"
import {
    createUserValidator,
    updateUserValidator
} from "../validators/user.validator.js"

const authenticatorRouter = express.Router()
authenticatorRouter.post(
    "/register",
    [].concat(dateValidator, createUserValidator),
    authenticatorController.registerUser
)
authenticatorRouter.patch(
    "/verify/:id",
    [].concat(idValidator),
    authenticatorController.verifyUser
)
authenticatorRouter.patch(
    "/login/:id",
    [].concat(idValidator),
    authenticatorController.loginUser
)
authenticatorRouter.patch(
    "/logout/:id",
    [].concat(idValidator),
    authenticatorController.logoutUser
)
authenticatorRouter.get(
    "/getAccessToken",
    authenticatorController.getAccessToken
)
authenticatorRouter.patch(
    "/updateById/:id",
    [].concat(idValidator, dateValidator, updateUserValidator),
    authenticatorController.updateUserById
)
authenticatorRouter.delete(
    "/deleteById/:id",
    [].concat(idValidator),
    authenticatorController.deleteUserById
)

export default authenticatorRouter
