import {validationResult} from "express-validator"
import {Op} from "sequelize"
import {userModel} from "../dbutils/defineModels.js"
import {genHashPassword} from "../hasher/genHashPassword.js"

export async function createUser(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const userData = req.body
        if (await userModel.findOne({where: {email: userData.email}}) !== null)
            return res.status(400).json({
                msg: "User with this email already exist, email: " + userData.email
            })
        if (await userModel.findOne({where: {login: userData.login}}) !== null)
            return res.status(400).json({
                msg: "User with this login already exist, login: " + userData.login
            })
        userData.password = await genHashPassword(userData.password)
        await userModel.create(
            userData
        ).then(function(createdUser) {
            return res.status(200).json({
                msg: "User has been created"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not create user"
        })
    }
}

export async function getUserById(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        await userModel.findOne({
            attributes: [
                "id",
                "email",
                "login",
                "password",
                "verified",
                "pfpUrl",
                "name",
                "surname",
                "creationDate",
                "updateDate"
            ],
            where: {id: id}
        }).then(function(foundedUser) {
            if (!foundedUser)
                return res.status(400).json({
                    msg: "User with this id does not exist, id: " + id
                })
            return res.status(200).json(foundedUser)
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not find user"
        })
    }
}

export async function getAllUsers(req, res) {
    try {
        await userModel.findAll({
            attributes: [
                "id",
                "email",
                "login",
                "password",
                "verified",
                "pfpUrl",
                "name",
                "surname",
                "creationDate",
                "updateDate"
            ]
        }).then(function(foundedUsers) {
            if (!foundedUsers)
                return res.status(400).json({
                    msg: "No users are exist"
                })
            return res.status(200).json(foundedUsers)
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not find all users"
        })
    }
}

export async function updateUserById(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        const userData = req.body
        if (await userModel.findOne({where: {id: id}}) === null)
            return res.status(400).json({
                msg: "User with this id does not exist, id: " + id
            })
        if (await userModel.findOne({
            where: {
                email: userData.email,
                id: {[Op.ne]: id}
            }
        }) !== null)
            return res.status(400).json({
                msg: "User with this email already exist, email: " + userData.email
            })
        if (await userModel.findOne({
            where: {
                login: userData.login,
                id: {[Op.ne]: id}
            }
        }) !== null)
            return res.status(400).json({
                msg: "User with this login already exist, login: " + userData.login
            })
        userData.password = await genHashPassword(userData.password)
        userData.updateDate = Date.now()
        await userModel.update(
            userData,
            {where: {id: id}}
        ).then(function(updatedUser) {
            return res.status(200).json({
                msg: "User has been updated"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not update user"
        })
    }
}

export async function deleteUserById(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        if (await userModel.findOne({where: {id: id}}) === null)
            return res.status(400).json({
                msg: "User with this id does not exist, id: " + id
            })
        await userModel.destroy({where: {id: id}}).then(function(deletedUser) {
            return res.status(200).json({
                msg: "User has been deleted"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not delete user"
        })
    }
}
