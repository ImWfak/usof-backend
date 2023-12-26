import {validationResult} from "express-validator"
import {
    userModel,
    forumRoleModel
} from "../dbutils/defineModels.js"

export async function createForumRole(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const forumRoleDate = req.body
        if (await userModel.findOne({where: {id: forumRoleDate.userId}}) === null)
            return res.status(400).json({
                msg: "User with this userId does not exist, userId:" + forumRoleDate.userId
            })
        await forumRoleModel.create(
            forumRoleDate
        ).then(function(createForumRole) {
            return res.status(200).json({
                msg: "Forum role has been created"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not create forum role"
        })
    }
}

export async function getForumRoleById(req, res) {
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        await forumRoleModel.findOne({
            attributes: [
                "id",
                "userId",
                "role",
                "creationDate"
            ],
            where: {id: id}
        }).then(function(foundedForumRole) {
            if (!foundedForumRole)
                return res.status(400).json({
                    msg: "Forum role with this id does not exist, id: " + id
                })
            return res.status(200).json(foundedForumRole)
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not find forum role"
        })
    }
}

export async function getAllForumRoles(req, res) {
    try {
        await forumRoleModel.findAll({
            attributes: [
                "id",
                "userId",
                "role",
                "creationDate"
            ],
        }).then(function(foundedForumRoles) {
            if (!foundedForumRoles)
                return res.status(400).json({
                    msg: "No forum roles are exist"
                })
            return res.status(200).json(foundedForumRoles)
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not find all forum roles"
        })
    }
}

export async function deleteForumRoleById(req, res){
    try {
        const err = await validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        if (await forumRoleModel.findOne({where: {id: id}}) === null)
            return res.status(400).json({
                msg: "Forum role with this id does not exist, id: " + id
            })
        await forumRoleModel.destroy({where: {id: id}}).then(function(deletedForumRole) {
            return res.status(200).json({
                msg: "Forum role has been deleted"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not delete forum role"
        })
    }
}
