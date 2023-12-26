import express from "express"
import {
    createForumRole,
    getForumRoleById,
    getAllForumRoles,
    deleteForumRoleById
} from "../crudControllers/forumRole.controller.js"
import {createForumRoleValidator} from "../validators/forumRole.validator.js"
import {idValidator} from "../validators/id.validator.js"

const forumRoleRouter = express.Router()
forumRoleRouter.post(  "/createForumRole",         createForumRoleValidator, createForumRole)
forumRoleRouter.get(   "/getForumRoleById/:id",    idValidator,              getForumRoleById)
forumRoleRouter.get(   "/getAllForumRoles",                                  getAllForumRoles)
forumRoleRouter.delete("/deleteForumRoleById/:id", idValidator,              deleteForumRoleById)

export default forumRoleRouter
