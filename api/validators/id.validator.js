import {param} from "express-validator"

export const idValidator = [
    param("id").isInt({min: 0}).notEmpty().withMessage("Wrong id")
]
