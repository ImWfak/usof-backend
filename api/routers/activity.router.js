import express from "express"
import {
    createActivity,
    getActivityById,
    getAllActivities,
    updateActivityById,
    deleteActivityById
} from "../crudControllers/activity.controller.js"
import {
    createActivityValidator,
    updateActivityValidator
} from "../validators/activity.validator.js"
import {idValidator} from "../validators/id.validator.js"

const activityRouter = express.Router()
activityRouter.post(  "/createActivity",         createActivityValidator, createActivity)
activityRouter.get(   "/getActivityById/:id",    idValidator,             getActivityById)
activityRouter.get(   "/getAllActivities",                                getAllActivities)
//activityRouter.patch( "/updateActivityById/:id", updateActivityValidator, updateActivityById)
activityRouter.delete("/deleteActivityById/:id", idValidator,             deleteActivityById)

export default activityRouter
