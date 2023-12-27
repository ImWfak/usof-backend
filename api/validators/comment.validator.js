import {body} from "express-validator"
import {idValidator} from "./id.validator.js"
import {dateValidator} from "./date.validator.js"
import {commentForEnum} from "../enums/commentType.enum.js"

export const createCommentValidator = [
    body("userId")      .exists()       .isInt({min: 0})    .withMessage("Wrong comment userId"),
    body("commentType") .exists()       .isIn(commentForEnum)      .withMessage("Wrong comment type"),
    body("postId")      .optional()     .isInt({min: 0})    .withMessage("Wrong comment postId"),
    body("commentId")   .optional()     .isInt({min: 0})    .withMessage("Wrong comment commentId"),
    body("content")     .exists()       .isString()                .withMessage("Wrong comment content"),
].concat(dateValidator)

export const updateCommentValidator = [
    body("userId")      .optional()     .isInt({min: 0})    .withMessage("Wrong comment userId"),
    body("commentType") .optional()     .isIn(commentForEnum)      .withMessage("Wrong comment type"),
    body("postId")      .optional()     .isInt({min: 0})    .withMessage("Wrong comment postId"),
    body("commentId")   .optional()     .isInt({min: 0})    .withMessage("Wrong comment commentId"),
    body("content")     .optional()     .isString()                .withMessage("Wrong comment content"),
].concat(idValidator, dateValidator)
