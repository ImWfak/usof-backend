import {validationResult} from "express-validator"
import {commentForEnum} from "../enums/commentType.enum.js"
import {
    userModel,
    postModel,
    commentModel
} from "../dbutils/defineModels.js"

export async function createComment(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const commentData = req.body
        if (await userModel.findOne({where: {id: commentData.userId}}) === null)
            return res.status(400).json({
                msg: "User with this id does not exist, id: " + commentData.userId
            })
        if (commentData.commentFor === commentForEnum.POST) {
            if (await postModel.findOne({where: {id: commentData.postId}}) === null)
                return res.status(400).json({
                    msg: "Post with this id does not exist, id: " + commentData.postId
                })
            commentData.commentId = null
        } else if (commentData.commentFor === commentForEnum.COMMENT) {
            if (await commentModel.findOne({where: {id: commentData.commentId}}) === null)
                return res.status(400).json({
                    msg: "Comment with this id does not exist, id: " + commentData.commentId
                })
            commentData.postId = null
        }
        await commentModel.create(
            commentData
        ).then(function(createdComment) {
            return res.status(200).json({
                msg: "Comment has been created"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not create comment"
        })
    }
}
export async function getCommentById(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        await commentModel.findOne({
            attributes: [
                "id",
                "userId",
                "commentType",
                "postId",
                "commentId",
                "content",
                "creationDate",
                "updateDate"
            ],
            where: {id: id}
        }).then(function(foundedComment) {
            if (!foundedComment)
                return res.status(400).json({
                    msg: "Comment with this id does not exist, id: " + id
                })
            return res.status(200).json({foundedComment})
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not find comment"
        })
    }
}

export async function getAllComments(req, res) {
    try {
        await commentModel.findAll({
            attributes: [
                "id",
                "userId",
                "commentType",
                "postId",
                "commentId",
                "content",
                "creationDate",
                "updateDate"
            ]
        }).then(function(foundedComments) {
            if (!foundedComments)
                return res.status(400).json({
                    msg: "No comments are exist"
                })
            return res.status(200).json(foundedComments)
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not find all comments"
        })
    }
}

export async function updateCommentById(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        const commentData = req.body
        if (await commentModel.findOne({where: {id: id}}) === null)
            return res.status(400).json({
                msg: "Comment with this id does not exist, id: " + id
            })
        if (await userModel.findOne({where: {id: commentData.userId}}) === null)
            return res.status(400).json({
                msg: "User with this id does not exist, id: " + commentData.userId
            })
        if (commentData.commentFor === commentForEnum.POST) {
            if (await postModel.findOne({where: {id: commentData.postId}}) === null)
                return res.status(400).json({
                    msg: "Post with this id does not exist, id: " + commentData.postId
                })
            commentData.commentId = null
        } else if (commentData.commentFor === commentForEnum.COMMENT) {
            if (await commentModel.findOne({where: {id: commentData.commentId}}) === null)
                return res.status(400).json({
                    msg: "Comment with this id does not exist, id: " + commentData.commentId
                })
            commentData.postId = null
        }
        commentData.updateDate = Date.now()
        await commentModel.update(
            commentData,
            {where: {id: id}}
        ).then(function(updatedComment) {
            return res.status(200).json({
                msg: "Comment has been updated"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not update comment"
        })
     }
}

export async function deleteCommentById(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        if (await commentModel.findOne({where: {id: id}}) === null)
            return res.status(400).json({
                msg: "Comment with this id does not exist, id: " + id
            })
        await commentModel.destroy({where: {id: id}}).then(function(deletedComment) {
            return res.status(200).json({
                msg: "Comment has been deleted"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can nto delete comment"
        })
    }
}
