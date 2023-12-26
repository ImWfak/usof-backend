import {body} from "express-validator"
import {dateValidator} from "./date.validator.js"
import {idValidator} from "./id.validator.js"

export const createTopicValidator = [
    body("name")        .exists()       .isString()                .withMessage("Wrong topic name"),
    body("description") .exists()       .isString()                .withMessage("Wrong topic description")
].concat(dateValidator)

export const updateTopicValidator = [
    body("name")        .optional()     .isString()                .withMessage("Wrong topic name"),
    body("description") .optional()     .isString()                .withMessage("Wrong topic description")
].concat(idValidator, dateValidator)
