import {body} from "express-validator"
import {idValidator} from "./id.validator.js"
import {dateValidator} from "./date.validator.js"
import {
    userEmailRegex,
    userPasswordRegex,
    userPfpUrlRegex
} from "../regexes/user.regex.js"

export const createUserValidation = [
    body("email")       .isEmail()  .exists()
        .matches(userEmailRegex)
        .withMessage("Wrong user email"),
    body("login")       .isString() .exists().withMessage("Wrong user login"),
    body("password")    .isString() .exists()
        .matches(userPasswordRegex)
        .withMessage("Wrong user password"),
    body("pfpUrl")      .isString() .optional()
        .matches(userPfpUrlRegex)
        .withMessage("Wrong user pfpUrl"),
    body("name")        .isString() .exists().withMessage("Wrong user name"),
    body("surname")     .isString() .exists().withMessage("Wrong user surname"),
].concat(dateValidator)

export const updateUserValidator = [
    body("email")       .isEmail()  .optional()
        .matches(userEmailRegex)
        .withMessage("Wrong user email"),
    body("login")       .isString() .optional().withMessage("Wrong user login"),
    body("password")    .isString() .optional()
        .matches(userPasswordRegex)
        .withMessage("Wrong user password"),
    body("verified")    .isBoolean().optional().withMessage("Wrong verify"),
    body("pfpUrl")      .isString() .optional()
        .matches(userPfpUrlRegex)
        .withMessage("Wrong user pfpUrl"),
    body("name")        .isString() .optional().withMessage("Wrong user name"),
    body("surname")     .isString() .optional().withMessage("Wrong user surname")
].concat(idValidator, dateValidator)
