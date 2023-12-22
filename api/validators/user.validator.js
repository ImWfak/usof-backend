import {body} from "express-validator"
import {idValidator} from "./id.validator.js";

export const createUserValidation = [
    body("email", "Wrong user email").isEmail().notEmpty(),
    body("login", "Wrong user login").isString().notEmpty(),
    body("password", "Wrong user password").isString().notEmpty(),
    body("name", "Wrong user name").isString().notEmpty(),
    body("name", "Wrong user surname").isString().notEmpty()
]

export const updateUserValidator = [
    body("email", "Wrong user email").isEmail().optional(),
    body("login", "Wrong user login").isString().optional(),
    body("password", "Wrong user password").isString().optional(),
    body("verified", "Wrong verify").isBoolean().optional(),
    body("pfpUrl", "Wrong user pfpUrl").isString().optional(),
    body("name", "Wrong user name").isString().optional(),
    body("surname", "Wrong user surname").isString().optional()
].concat(idValidator)
