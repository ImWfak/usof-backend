import {body} from "express-validator"
import {idValidator} from "./id.validator.js"
import {dateValidator} from "./date.validator.js"
import {activityForEnum} from "../enums/activityFor.enum.js"
import {activityTypeEnum} from "../enums/activityType.enum.js"

export const createActivityValidator = [
    body("userId")      .exists()       .isInt({min: 0})    .withMessage("Wrong activity userId"),
    body("activityFor") .exists()       .isIn(activityForEnum)     .withMessage("Wrong activity for value"),
    body("postId")      .optional()     .isInt({min: 0})    .withMessage("Wrong activity postId"),
    body("commentId")   .optional()     .isInt({min: 0})    .withMessage("Wrong activity commentId"),
    body("activityType").exists()       .isIn(activityTypeEnum)    .withMessage("Wrong activity type value")
].concat(dateValidator)

export const updateActivityValidator = [
    body("userId")      .optional()     .isInt({min: 0})    .withMessage("Wrong activity userId"),
    body("activityFor") .optional()     .isIn(activityForEnum)     .withMessage("Wrong activity for value"),
    body("postId")      .optional()     .isInt({min: 0})    .withMessage("Wrong activity postId"),
    body("commentId")   .optional()     .isInt({min: 0})    .withMessage("Wrong activity commentId"),
    body("activityType").optional()     .isIn(activityTypeEnum)    .withMessage("Wrong activity type value")
].concat(idValidator, dateValidator)
