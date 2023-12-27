import express from "express"
import {
    createComment,
    getCommentById,
    getAllComments,
    updateCommentById,
    deleteCommentById
} from "../crudControllers/comment.controller.js"
import {
    createCommentValidator,
    updateCommentValidator
} from "../validators/comment.validator.js"
import {idValidator} from "../validators/id.validator.js"

const commentRouter = express.Router()
commentRouter.post(  "/createComment",          createCommentValidator, createComment)
commentRouter.get(   "/getCommentById/:id",     idValidator,            getCommentById)
commentRouter.get(   "/getAllComments",                                 getAllComments)
commentRouter.patch( "/updateCommentById/:id",  updateCommentValidator, updateCommentById)
commentRouter.delete("/deleteCommentById/:id",  idValidator,            deleteCommentById)

export default commentRouter
