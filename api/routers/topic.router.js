import express from "express"
import {
    createTopic,
    getTopicById,
    getAllTopics,
    updateTopicById,
    deleteTopicById
} from "../crudControllers/topic.controller.js"
import {
    createTopicValidator,
    updateTopicValidator
} from "../validators/topic.validator.js"
import {idValidator} from "../validators/id.validator.js"

const topicRouter = express.Router()
topicRouter.post(   "/createTopic",         createTopicValidator, createTopic)
topicRouter.get(    "/getTopicById/:id",    idValidator,          getTopicById)
topicRouter.get(    "/getAllTopics",                              getAllTopics)
topicRouter.patch(  "/updateTopicById/:id", updateTopicValidator, updateTopicById)
topicRouter.delete( "/deleteTopicById/:id", idValidator,          deleteTopicById)

export default topicRouter
