import {body} from "express-validator"
import {dateValidator} from "./date.validator.js"

export const createPostRefTopicValidator = [
    body("postId")      .exists()       .isInt({min: 0})    .withMessage("Wrong post ref topic postId"),
    body("topicId")     .exists()       .isInt({min: 0})    .withMessage("Wrong post ref topic topicId")
].concat(dateValidator)
