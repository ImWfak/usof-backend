import {body} from "express-validator"
import {dateValidator} from "./date.validator.js"
import {idValidator} from "./id.validator.js"
import {commentTypeEnum} from "../enums/commentType.enum.js"

export const createCommentValidator = [
    body("userId")      .exists()       .isInt({min: 0})    .withMessage("Wrong comment userId"),
    body("commentType") .exists()       .isIn(commentTypeEnum)     .withMessage("Wrong comment type"),
    body("postId")      .optional()     .isInt({min: 0})    .withMessage("Wrong comment postId"),
    body("commentId")   .optional()     .isInt({min: 0})    .withMessage("Wrong comment commentId"),
    body("content")     .exists()       .isString()                .withMessage("Wrong comment content"),
].concat(dateValidator)

export const updateCommentValidator = [
    body("userId")      .optional()     .isInt({min: 0})    .withMessage("Wrong comment userId"),
    body("commentType") .optional()     .isIn(commentTypeEnum)     .withMessage("Wrong comment type"),
    body("postId")      .optional()     .isInt({min: 0})    .withMessage("Wrong comment postId"),
    body("commentId")   .optional()     .isInt({min: 0})    .withMessage("Wrong comment commentId"),
    body("content")     .optional()     .isString()                .withMessage("Wrong comment content"),
].concat(idValidator, dateValidator)
