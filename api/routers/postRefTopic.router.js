import express from "express"
import {
    createPostRefTopic,
    getPostRefTopicById,
    getAllPostsRefTopics,
    deletePostRefTopicById
} from "../crudControllers/postRefTopic.controller.js"
import {createPostRefTopicValidator} from "../validators/postRefTopic.validator.js"
import {idValidator} from "../validators/id.validator.js"

const postRefTopicRouter = express.Router()
postRefTopicRouter.post(  "/createPostRefTopic",         createPostRefTopicValidator, createPostRefTopic)
postRefTopicRouter.get(   "/getPostRefTopicById/:id",    idValidator,                 getPostRefTopicById)
postRefTopicRouter.get(   "/getAllPostsRefTopics",                                    getAllPostsRefTopics)
postRefTopicRouter.delete("/deletePostRefTopicById/:id", idValidator,                 deletePostRefTopicById)

export default postRefTopicRouter
