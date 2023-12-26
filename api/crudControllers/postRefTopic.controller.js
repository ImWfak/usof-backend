import {validationResult} from "express-validator"
import {
    postModel,
    postRefTopicModel,
    topicModel
} from "../dbutils/defineModels.js"

export async function createPostRefTopic(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const postId = req.body.postId
        const topicId = req.body.topicId
        if (await postModel.findOne({where: {id: postId}}) === null)
            return res.status(400).json({
                msg: "Post with this id does not exist, id: " + postId
            })
        if (await topicModel.findOne({where: {id: topicId}}) === null)
            return res.status(400).json({
                msg: "Topic with this id does not exist, id: " + topicId
            })
        let post = await postModel.findOne({where: {id: postId}})
        let topic = await topicModel.findOne({where: {id: topicId}})
        post.addTopic(topic).then(function (createPostRefTopic) {
            return res.status(200).json({
                msg: "Post ref topic has been created"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not create post ref topic"
        })
    }
}

export async function getPostRefTopicById(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        await postRefTopicModel.findOne({
            attributes: [
                "id",
                "postId",
                "topicId",
                "creationDate"
            ],
            where: {id: id}
        }).then(function(foundedPostRefTopic) {
            if (!foundedPostRefTopic)
                return res.status(400).json({
                    msg: "Post ref topic with this id does not exist, id: " + id
                })
            return res.status(200).json(foundedPostRefTopic)
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not find post ref topic"
        })
    }
}

export async function getAllPostsRefTopics(req, res) {
    try {
        await postRefTopicModel.findAll({
            attributes: [
                "id",
                "postId",
                "topicId",
                "creationDate"
            ]
        }).then(function(foundedPostsRefTopics) {
            if (!foundedPostsRefTopics)
                return res.status(400).json({
                    msg: "No posts ref topics are exist"
                })
            return res.status(200).json(foundedPostsRefTopics)
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not find all posts ref topics"
        })
    }
}

export async function deletePostRefTopicById(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        if (await postRefTopicModel.findOne({where: {id: id}}) === null)
            return res.status(400).json({
                msg: "Post ref topic with this id does not exist, id: " + id
            })
        await postRefTopicModel.destroy({where: {id: id}}).then(function(deletedPostRefTopic) {
            return res.status(200).json({
                msg: "Post ref topic has been deleted"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not delete post ref topic"
        })
    }
}
