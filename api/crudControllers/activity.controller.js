import {validationResult} from "express-validator"
import {activityForEnum} from "../enums/activityFor.enum.js"
import {
    userModel,
    postModel,
    commentModel,
    activityModel
} from "../dbutils/defineModels.js"
import {commentForEnum} from "../enums/commentType.enum.js";

export async function createActivity(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return req.status(400).json({
                err: err.array()
            })
        const activityData = req.body
        if (await userModel.findOne({where: {id: activityData.userId}}) === null)
            return res.status(400).json({
                msg: "User with this id does not exist, id: " + activityData.userId
            })
        if (activityData.activityFor === activityForEnum.POST) {
            if (await postModel.findOne({where: {id: activityData.postId}}) === null)
                return res.status(400).json({
                    msg: "Post with this id does not exist, id: " + activityData.postId
                })
            activityData.commentId = null
        } else if (activityData.activityFor === activityForEnum.COMMENT) {
            if (await commentModel.findOne({where: {id: activityData.commentId}}) === null)
                return res.status(400).json({
                    msg: "Comment with this id does not exist, id: " + activityData.commentId
                })
            activityData.postId = null
        }
        await activityModel.create(
            activityData
        ).then(function(createdActivity) {
            return res.status(200).json({
                msg: "Activity has been created"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not create activity"
        })
    }
}

export async function getActivityById(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return req.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        await activityModel.findOne({
            attributes: [
                "id",
                "userId",
                "activityFor",
                "postId",
                "commentId",
                "activityType",
                "creationDate"
            ],
            where: {id: id}
        }).then(function(foundedActivity) {
            if (!foundedActivity)
                return res.status(400).json({
                    msg: "Activity with this id does not exist, id: " + id
                })
            return res.status(200).json(foundedActivity)
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not find activity"
        })
    }
}

export async function getAllActivities(req, res) {
    try {
        await activityModel.findAll({
            attributes: [
                "id",
                "userId",
                "activityFor",
                "postId",
                "commentId",
                "activityType",
                "creationDate"
            ]
        }).then(function(foundedActivities) {
            if (!foundedActivities)
                return res.status(400).json({
                    msg: "No activities are exist"
                })
            return res.status(200).json(foundedActivities)
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not find all activities"
        })
    }
}

export async function updateActivityById(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        const activityData = req.body
        if (await activityModel.findOne({where: {id: id}}) === null)
            return res.status(400).json({
                msg: "Activity with this id does not exist, id: " + id
            })
        if (await userModel.findOne({where: {id: activityData.userId}}) === null)
            return res.status(400).json({
                msg: "User with this id does not exist, id: " + id
            })
        if (activityData.commentFor === commentForEnum.POST) {
            if (await postModel.findOne({where: {id: activityData.postId}}) === null)
                return res.status(400).json({
                    msg: "Post with this id does not exist, id: " + activityData.postId
                })
            activityData.commentId = null
        } else if (activityData.commentFor === commentForEnum.COMMENT) {
            if (await commentModel.findOne({where: {id: activityData.commentId}}) === null)
                return res.status(400).json({
                    msg: "Comment with this id does not exist, id: " + activityData.commentId
                })
            activityData.postId = null
        }
        activityData.updateDate = Date.now()
        await activityData.update(
            activityData,
            {where: {id: id}}
        ).then(function(updatedActivity) {
            return res.status(200).json({
                msg: "Activity has been updated"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not update activity"
        })
    }
}

export async function deleteActivityById(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        if (await activityModel.findOne({where: {id: id}}) === null)
            return res.status(400).json({
                msg: "Activity with this id does not exist, id: " + id
            })
        await activityModel.destroy({where: {id: id}}).then(function(deletedActivity) {
            return res.status(200).json({
                msg: "Activity has been deleted"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not delete activity"
        })
    }
}
