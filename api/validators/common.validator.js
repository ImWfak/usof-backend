import {
    body,
    param
} from "express-validator"

export const idValidator = [
    param("id")         .exists()   .isInt({min: 1})    .withMessage("Wrong id value")
]

export const userIdExistValidator = [
    body("userId")      .exists()   .isInt({min: 1})    .withMessage("Wrong userId value")
]
export const userIdOptionalValidator =[
    body("userId")      .optional() .isInt({min: 1})    .withMessage("Wrong userId value")
]

export const postIdExistValidator = [
    body("postId")      .exists()   .isInt({min: 1})    .withMessage("Wrong postId value")
]
export const postIdOptionalValidator =[
    body("postId")      .optional() .isInt({min: 1})    .withMessage("Wrong postId value")
]

export const commentIdExistValidator = [
    body("commentId")   .exists()   .isInt({min: 1})    .withMessage("Wrong postId value")
]
export const commentIdOptionalValidator =[
    body("commentId")   .optional() .isInt({min: 1})    .withMessage("Wrong postId value")
]

export const dateValidator = [
    body("creationDate").not()      .exists()                  .withMessage("Wrong creationDate value"),
    body("updateDate")  .not()      .exists()                  .withMessage("Wrong updateDate value")
]
