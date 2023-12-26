import express from "express"
import {
    createPost,
    getPostById,
    getAllPosts,
    updatePostById,
    deletePostById
} from "../crudControllers/post.controller.js"
import {
    createPostValidator,
    updatePostValidator
} from "../validators/post.validator.js"
import {idValidator} from "../validators/id.validator.js"

const postRouter = express.Router()
postRouter.post(  "/createPost",         createPostValidator, createPost)
postRouter.get(   "/getPosyById/:id",    idValidator,         getPostById)
postRouter.get(   "/getAllPosts",                             getAllPosts)
postRouter.patch( "/updatePostById/:id", updatePostValidator, updatePostById)
postRouter.delete("/deletePostById/:id", idValidator,         deletePostById)

export default postRouter
