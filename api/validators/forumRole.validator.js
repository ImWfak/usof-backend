import {body} from "express-validator"
import {dateValidator} from "./date.validator.js"
import {forumRoleEnum} from "../enums/forumRoles.enum.js"

export const createForumRoleValidator = [
    body("userId")      .exists()       .isInt({min: 0})    .withMessage("Wrong forum role userId"),
    body("role")        .exists()       .isIn(forumRoleEnum)       .withMessage("Wrong forum role")
].concat(dateValidator)
