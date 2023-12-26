import {validationResult} from "express-validator"
import {Op} from "sequelize"
import {topicModel} from "../dbutils/defineModels.js"

export async function createTopic(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const topicData = req.body
        if (await topicModel.findOne({where: {name: topicData.name}}) !== null)
            return res.status(400).json({
                msg: "Topic with this name already exist, name: " + topicData.name
            })
        await topicModel.create(
            topicData
        ).then(function(createdTopic) {
            return res.status(200).json({
                msg: "Topic has been created"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not create topic"
        })
    }
}

export async function getTopicById(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        await topicModel.findOne({
            attributes: [
                "id",
                "name",
                "description",
                "creationDate",
                "updateDate"
            ],
            where: {id: id}
        }).then(function(foundedTopic) {
            if (!foundedTopic)
                return res.status(400).json({
                    msg: "Topic with this id does not exist, id; " + id
                })
            return res.status(200).json(foundedTopic)
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not find topic"
        })
    }
}

export async function getAllTopics(req, res) {
    try {
        await topicModel.findAll({
            attributes: [
                "id",
                "name",
                "description",
                "creationDate",
                "updateDate"
            ]
        }).then(function(foundedTopics) {
            if (!foundedTopics)
                return res.status(400).json({
                    msg: "No topics are exist"
                })
            return res.status(200).json(foundedTopics)
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not find all topics"
        })
    }
}

export async function updateTopicById(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        const topicData = req.body
        if (await topicModel.findOne({where: {id: id}}) === null)
            return res.status(400).json({
                msg: "Topic with this id does not exist, id: " + id
            })
        if (await topicModel.findOne({
            where: {
                name: topicData.name,
                id: {[Op.ne]: id}
            }
        }) !== null)
            return res.status(400).json({
                msg: "Topic with this name already exist, name: " + topicData.name
            })
        topicData.updateDate = Date.now()
        await topicModel.update(
            topicData,
            {where: {id: id}}
        ).then(function(updatedTopic) {
            return res.status(200).json({
                msg: "Topic has been updated"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not update topic"
        })
    }
}

export async function deleteTopicById(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        if (await topicModel.findOne({where: {id: id}}) === null)
            return res.status(400).json({
                msg: "Topic with this id does nor exist, id: " + id
            })
        await topicModel.destroy({where: {id: id}}).then(function(deletedTopic) {
            return res.status(200).json({
                msg: "Topic has been deleted"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not delete topic"
        })
    }
}
