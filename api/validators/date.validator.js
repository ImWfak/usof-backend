import {body} from "express-validator"

export const dateValidator = [
    body("createDate").not().exists().withMessage("In request must not be createDate value"),
    body("updateDate").not().exists().withMessage("In request must not be updateDate value")
]
