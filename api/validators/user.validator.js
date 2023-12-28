import {body} from "express-validator"
import {
    userEmailRegex,
    userPhoneNumberRegex,
    userPasswordRegex,
    userPfpUrlRegex
} from "../regexes/user.regexex.js"

export const createUserValidator = [
    body("email")       .isString() .exists()   .matches(userEmailRegex)            .withMessage("Wrong user email value"),
    body("phoneNumber") .isString() .exists()   .matches(userPhoneNumberRegex)      .withMessage("Wrong user phoneNumber value"),
    body("login")       .isString() .exists()   .withMessage("Wrong user login value"),
    body("password")    .isString() .exists()   .matches(userPasswordRegex)         .withMessage("Wrong user password value"),
    body("pfpUrl")      .isString() .optional() .matches(userPfpUrlRegex)           .withMessage("Wrong user pfpUrl value"),
    body("name")        .isString() .exists()   .withMessage("Wrong user name value"),
    body("surname")     .isString() .exists()   .withMessage("Wrong user surname value")
]

export const updateUserValidator = [
    body("email")       .isString() .optional() .matches(userEmailRegex)            .withMessage("Wrong user email value"),
    body("phoneNumber") .isString() .optional() .matches(userPhoneNumberRegex)      .withMessage("Wrong user phoneNumber value"),
    body("login")       .isString() .optional() .withMessage("Wrong user login value"),
    body("password")    .isString() .optional() .matches(userPasswordRegex)         .withMessage("Wrong user password value"),
    body("verified")    .isBoolean().optional() .withMessage("Wrong verify value"),
    body("pfpUrl")      .isString() .optional() .matches(userPfpUrlRegex)           .withMessage("Wrong user pfpUrl value"),
    body("name")        .isString() .optional() .withMessage("Wrong user name value"),
    body("surname")     .isString() .optional() .withMessage("Wrong user surname value")
]
