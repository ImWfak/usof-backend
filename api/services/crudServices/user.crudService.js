import {userModel} from "../../dbutils/defineModels.js"
import {Op} from "sequelize"
import {genHashPassword} from "../hasher/genHashPassword.js"

class UserCrudService {
    async createUser(userData) {
        try {
            if (await userModel.findOne({where: {email: userData.email}}) !== null)
                return new Error("email")
            if (await userModel.findOne({where: {phoneNumber: userData.phoneNumber}}) !== null)
                return new Error("phoneNumber")
            if (await userModel.findOne({where: {login: userData.login}}) !== null)
                return new Error("login")
            userData.password = await genHashPassword(userData.password)
            return await userModel.create(userData)
        } catch (err) {
            return new Error(err)
        }
    }

    async getUserById(id) {
        try {
            const foundedUser = await userModel.findOne({where: {id: id}})
            if (!foundedUser)
                return new Error("id")
            else
                return foundedUser
        } catch (err) {
            return new Error(err)
        }
    }

    async getUserByEmail(email) {
        try {
            const foundedUser = await userModel.findOne({where: {email: email}})
            if (!foundedUser)
                return new Error("email")
            else
                return foundedUser
        } catch (err) {
            return new Error(err)
        }
    }

    async getUserByPhoneNumber(phoneNumber) {
        try {
            const foundedUser = await userModel.findOne({where: {phoneNumber: phoneNumber}})
            if (!foundedUser)
                return new Error("phoneNumber")
            else
                return foundedUser
        } catch (err) {
            return new Error(err)
        }
    }

    async getUserByLogin(login) {
        try {
            const foundedUser = await userModel.findOne({where: {login: login}})
            if (!foundedUser)
                return new Error("login")
            else
                return foundedUser
        } catch (err) {
            return new Error(err)
        }
    }
    async getAllUsers() {
        try {
            return await userModel.findAll()
        } catch (err) {
            return new Error(err)
        }
    }

    async updateUserById(id, userData) {
        try {
            if (await userModel.findOne({where: {id: id}}) === null)
                return new Error("id")
            if (await userModel.findOne({
                where: {
                    email: userData.email,
                    id: {[Op.ne]: id}
                }
            }) !== null)
                return new Error("email")
            if (await userModel.findOne({
                where: {
                    phoneNumber: userData.phoneNumber,
                    id: {[Op.ne]: id}
                }
            }) !== null)
                return new Error("phoneNumber")
            if (await userModel.findOne({
                where: {
                    login: userData.login,
                    id: {[Op.ne]: id}
                }
            }) !== null)
                return new Error("login")
            userData.updateDate = Date.now()
            return await userModel.update(
                userData,
                {where: {id: id}}
            )
        } catch (err) {
            return new Error(err)
        }
    }
    async deleteUserById(id) {
        try {
            const foundedUser = await userModel.findOne({where: {id: id}})
            if (!foundedUser)
                return new Error("id")
            else
                return await foundedUser.destroy()
        } catch (err) {
            return new Error(err)
        }
    }
}
export const userCrudService = new UserCrudService()
