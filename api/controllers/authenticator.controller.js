import {validationResult} from "express-validator"
import {userCrudService} from "../services/crudServices/user.crudService.js"

class AuthenticatorController {
    async registerUser(req, res, next) {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const userData = req.body
        const result = await userCrudService.createUser(userData)
        if (result instanceof Error) {
            if (result.message.includes("email")) {
                return res.status(400).json({
                    msg: "User with this email already exist, email: " + userData.email
                })
            } else if (result.message.includes("phoneNumber")) {
                return res.status(400).json({
                    msg: "User with this phoneNumber already exist, phoneNumber: " + userData.phoneNumber
                })
            } else if (result.message.includes("login")) {
                return res.status(400).json({
                    msg: "User with this login already exist, login: " + userData.login
                })
            } else {
                return res.status(500).json({
                    msg: "Server can not register user",
                    err: result.message
                })
            }
        } else {
            return res.status(200).json({
                msg: "User has been registered",
                result: result
            })
        }
    }

    async verifyUser(req, res) {
        //todo
    }

    async loginUser(req, res, next) {
        //todo
    }

    async logoutUser(req, res, next) {
        //todo
    }

    async getAccessToken(req, res, next) {
        //todo
    }

    async updateUserById(req, res) {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        const userData = req.body
        const result = await userCrudService.updateUserById(id, userData)
        if (result instanceof Error) {
            if (result.message.includes("email")) {
                return res.status(400).json({
                    msg: "User with this email already exist, email: " + userData.email
                })
            } else if (result.message.includes("phoneNumber")) {
                return res.status(400).json({
                    msg: "User with this phoneNumber already exist, phoneNumber: " + userData.phoneNumber
                })
            } else if (result.message.includes("login")) {
                return res.status(400).json({
                    msg: "User with this login already exist, login: " + userData.login
                })
            } else {
                return res.status(500).json({
                    msg: "Server can not update user",
                    result: result.message
                })
            }
        } else {
            return res.status(200).json({
                msg: "User has been updated",
                result: result
            })
        }
    }

    async deleteUserById(req, res) {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        const result = await userCrudService.deleteUserById(id)
        if (result instanceof Error) {
            if (result.message.includes("id")) {
                return res.status(400).json({
                    msg: "User with this id does not exist, id: " + id
                })
            } else {
                return res.status(500).json({
                    msg: "Server can not delete user",
                    err: result.message
                })
            }
        } else {
            return res.status(200).json({
                msg: "User has been deleted",
                result: result
            })
        }
    }
}
export const authenticatorController = new AuthenticatorController()
