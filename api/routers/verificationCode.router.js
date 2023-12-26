import express from "express"
import {
    createVerificationCode,
    getVerificationCodeById,
    getAllVerificationCodes,
    updateVerificationCodeById,
    deleteVerificationCodeById
} from "../crudControllers/verificationCode.controller.js"
import {
    createVerificationCodeValidator,
    updateVerificationCodeValidator
} from "../validators/verificationCode.validator.js"
import {idValidator} from "../validators/id.validator.js"

const verificationCodeRouter = express.Router()
verificationCodeRouter.post("/createVerificationCode", createVerificationCodeValidator, createVerificationCode)
verificationCodeRouter.get("/getVerificationCodeById/:id", idValidator, getVerificationCodeById)
verificationCodeRouter.get("/getAllVerificationCodes", getAllVerificationCodes)
verificationCodeRouter.patch("/updateVerificationCodeById/:id", updateVerificationCodeValidator, updateVerificationCodeById)
verificationCodeRouter.delete("/deleteVerificationCodeById/:id", idValidator, deleteVerificationCodeById)

export default verificationCodeRouter
