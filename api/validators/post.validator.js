import {body} from "express-validator"
import {idValidator} from "./id.validator.js"
import {dateValidator} from "./date.validator.js"
import {postStatusEnum} from "../enums/postStatus.enum.js"

export const createPostValidator = [
    body("userId")      .exists()       .isInt({min: 0})    .withMessage("Wrong post userId"),
    body("status")      .optional()     .isIn(postStatusEnum)      .withMessage("Wrong post status"),
    body("name")        .exists()       .isString()                .withMessage("Wrong post name"),
    body("content")     .exists()       .isString()                .withMessage("Wrong post content"),
].concat(dateValidator)

export const updatePostValidator = [
    body("userId")      .optional()     .isInt({min: 0})    .withMessage("Wrong post userId"),
    body("status")      .optional()     .isIn(postStatusEnum)      .withMessage("Wrong post status"),
    body("name")        .optional()     .isString()                .withMessage("Wrong post name"),
    body("content")     .optional()     .isString()                .withMessage("Wrong post content")
].concat(idValidator, dateValidator)
