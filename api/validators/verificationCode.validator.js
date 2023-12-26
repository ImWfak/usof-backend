import {body} from "express-validator";
import {dateValidator} from "./date.validator.js"
import {idValidator} from "./id.validator.js";

export const createVerificationCodeValidator = [
    body("userId")      .exists()       .isInt({min: 0})    .withMessage("Wrong verification code userId"),
].concat(dateValidator)

export const updateVerificationCodeValidator = [
    body("userId")      .optional()     .isInt({min: 0})    .withMessage("Wrong verification code userId")
].concat(idValidator, dateValidator)
