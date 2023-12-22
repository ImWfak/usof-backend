import {param} from "express-validator"

export const idValidator = [
    param("id", "Wrong id").isInt({min: 0}).notEmpty()
]
