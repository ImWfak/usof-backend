import {validationResult} from "express-validator"
import {userCrudService} from "../services/crudServices/user.crudService.js"

class UserController {
    async getUserById(req, res) {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        const result = await userCrudService.getUserById(id)
        if (result instanceof Error) {
            if (result.message.includes("id")) {
                return res.status(400).json({
                    msg: "User with this id does not exist, id: " + id
                })
            } else {
                return res.status(500).json({
                    msg: "Server can not get user by id",
                    result: result.message
                })
            }
        } else {
            return res.status(200).json({
                msg: "User has been got by id",
                result: result
            })
        }
    }

    async getUserByEmail(req, res) {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const email = req.params.email
        const result = await userCrudService.getUserByEmail(email)
        if (result instanceof Error) {
            if (result.message.includes("email")) {
                return res.status(400).json({
                    msg: "User with this email does not exist, email: " + email
                })
            } else {
                return res.status(500).json({
                    msg: "Server can not get user by email",
                    result: result.message
                })
            }
        } else {
            return res.status(200).json({
                msg: "User has been got by email",
                result: result
            })
        }
    }

    async getUserByPhoneNumber(req, res) {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const phoneNumber = req.params.phoneNumber
        const result = await userCrudService.getUserByPhoneNumber(phoneNumber)
        if (result instanceof Error) {
            if (result.message.includes("phoneNumber")) {
                return res.status(400).json({
                    msg: "User with this phoneNumber does not exist, phoneNumber: " + phoneNumber
                })
            } else {
                return res.status(500).json({
                    msg: "Server can not get user by phoneNumber",
                    result: result.message
                })
            }
        } else {
            return res.status(200).json({
                msg: "User has been got by phoneNumber",
                result: result
            })
        }
    }

    async getUserByLogin(req, res) {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const login = req.params.login
        const result = await userCrudService.getUserByLogin(login)
        if (result instanceof Error) {
            if (result.message.includes("login")) {
                return res.status(400).json({
                    msg: "User with this login does not exist, login: " + login
                })
            } else {
                return res.status(500).json({
                    msg: "Server can not get user by login",
                    result: result.message
                })
            }
        } else {
            return res.status(200).json({
                msg: "User has been got by login",
                result: result
            })
        }
    }

    async getAllUsers(req, res) {
        const result = await userCrudService.getAllUsers()
        if (result instanceof Error) {
            return res.status(500).json({
                msg: "Server can not get all users",
                result: result.message
            })
        } else {
            if (result.length !== 0) {
                return res.status(200).json({
                    msg: "All users have been found",
                    result: result
                })
            } else {
                return res.status(400).json({
                    msg: "No users are exist",
                    result: result
                })
            }
        }
    }
}
export const userController = new UserController()
