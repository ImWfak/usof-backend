import {validationResult} from "express-validator"
import {
    userModel,
    postModel
} from "../dbutils/defineModels.js"

export async function createPost(req, res) {
    try {
        const err = validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const postData = req.body
        if (await userModel.findOne({where: {id: postData.userId}}) === null)
            return res.status(400).json({
                msg: "User with this userId does not exist, userId:" + postData.userId
            })
        await postModel.create(
            postData
        ).then(function(createdPost) {
            return res.status(200).json({
                msg: "Post has been created"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not create post"
        })
    }
}

export async function getPostById(req, res) {
    try {
        const err = validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        await postModel.findOne({
            attributes: [
                "id",
                "userId",
                "status",
                "name",
                "content",
                "creationDate",
                "updateDate"
            ],
            where: {id: id}
        }).then(function(foundedPost) {
            if (!foundedPost)
                return res.status(400).json({
                    msg: "Post with this id does not exist, id: " + id
                })
            return res.status(200).json(foundedPost)
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not find post"
        })
    }
}

export async function getAllPosts(req, res) {
    try {
        await postModel.findAll({
            attributes: [
                "id",
                "userId",
                "status",
                "name",
                "content",
                "creationDate",
                "updateDate"
            ]
        }).then(function(foundedPosts) {
            if (!foundedPosts)
                return res.status(400).json({
                    msg: "No posts are exist"
                })
            return res.status(200).json(foundedPosts)
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not find all posts"
        })
    }
}

export async function updatePostById(req, res) {
    try {
        const err = validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        const postData = req.body
        if (await userModel.findOne({where: {id: postData.userId}}) === null)
            return res.status(400).json({
                msg: "User with this userId does not exist, userId: " + postData.userId
            })
        if (await postModel.findOne({where: {id: id}}) === null)
            return res.status(400).json({
                msg: "Post with this id does not exist, id: " + id
            })
        postData.updateDate = Date.now()
        await postModel.update(
            postData,
            {where: {id: id}}
        ).then(function(updatedPost) {
            return res.status(200).json({
                msg: "Post has been updated"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not update post"
        })
    }
}

export async function deletePostById(req, res) {
    try {
        const err = validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        if (await postModel.findOne({where: {id: id}}) === null)
            return res.status(400).json({
                msg: "Post with this id does not exist, id: " + id
            })
        await postModel.destroy({where: {id: id}}).then(function(deletedPost) {
            return res.status(200).json({
                msg: "Post has been deleted"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not delete post"
        })
    }
}
