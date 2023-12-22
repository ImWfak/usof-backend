import express from "express"
import {
    createUser,
    getUserById,
    getAllUsers,
    updateUserById,
    deleteUserById
} from "../crudControllers/user.controller.js"
import {
    createUserValidator,
    updateUserValidator
} from "../validators/user.validator.js"
import {idValidator} from "../validators/id.validator.js"

const userRouter= express.Router()
userRouter.post("/createUser", createUserValidator, createUser)
userRouter.get("/getUserById/:id", idValidator, getUserById)
userRouter.get("/getAllUsers", getAllUsers)
userRouter.patch("/updateUserById/:id", updateUserValidator, updateUserById)
userRouter.delete("/deleteUserById/:id", idValidator, deleteUserById)

export default userRouter
