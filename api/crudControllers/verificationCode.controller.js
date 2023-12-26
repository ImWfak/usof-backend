import {validationResult} from "express-validator"
import randomstring from "randomstring"
import {
    userModel,
    verificationCodeModel
} from "../dbutils/defineModels.js"

async function genVerificationCode() {
    return randomstring.generate({
        length: 6,
        charset: "numeric"
    })
}

export async function createVerificationCode(req, res) {
    try {
        const err = validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const verificationCodeData = req.body
        if (await userModel.findOne({where: {id: verificationCodeData.userId}}) === null)
            return res.status(400).json({
                msg: "User with this userId does not exist, userId:" + verificationCodeData.userId
            })
        verificationCodeData.code = await genVerificationCode()
        while(await verificationCodeModel.findOne({where: {code: verificationCodeData.code}}) !== null)
            verificationCodeData.code = await genVerificationCode()
        await verificationCodeModel.create(
            verificationCodeData
        ).then(function(createdPost) {
            return res.status(200).json({
                msg: "Verification code has been created"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not create verification code"
        })
    }
}

export async function getVerificationCodeById(req, res) {
    try {
        const err = validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        await verificationCodeModel.findOne({
            attributes: [
                "id",
                "userId",
                "code",
                "creationDate"
            ],
            where: {id: id}
        }).then(function(foundedVerificationCode) {
            if (!foundedVerificationCode)
                return res.status(400).json({
                    msg: "Verification code with this id does not exist, id: " + id
                })
            return res.status(200).json(foundedVerificationCode)
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not find verification code"
        })
    }
}

export async function getAllVerificationCodes(req, res) {
    try {
        await verificationCodeModel.findAll({
            attributes: [
                "id",
                "userId",
                "code",
                "creationDate"
            ]
        }).then(function(foundedVerificationCodes) {
            if (!foundedVerificationCodes)
                return res.status(400).json({
                    msg: "No verification codes are exist"
                })
            return res.status(200).json(foundedVerificationCodes)
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not find all verification codes"
        })
    }
}

export async function updateVerificationCodeById(req, res) {
    try {
        const err = validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        const verificationCodeData = req.body
        if (await verificationCodeModel.findOne({where: {id: id}}) === null)
            return res.status(400).json({
                msg: "Verification code with this id does not exist, id: " + id
            })
        if (await userModel.findOne({where: {id: verificationCodeData.userId}}) === null)
            return res.status(400).json({
                msg: "User with this userId does not exist, userId:" + verificationCodeData.userId
            })
        verificationCodeData.code = await genVerificationCode()
        while(await verificationCodeModel.findOne({where: {code: verificationCodeData.code}}) !== null)
            verificationCodeData.code = await genVerificationCode()
        await verificationCodeModel.update(
            verificationCodeData,
            {where: {id: id}}
        ).then(function(updatedVerificationCode) {
            return res.status(200).json({
                msg: "Verification code has been updated"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not update verification code"
        })
    }
}

export async function deleteVerificationCodeById(req, res) {
    try {
        const err = validationResult(req)
        if (!err.isEmpty())
            return res.status(400).json({
                err: err.array()
            })
        const id = req.params.id
        if (await verificationCodeModel.findOne({where: {id: id}}) === null)
            return res.status(400).json({
                msg: "Verification code with this id does not exist, id: " + id
            })
        await verificationCodeModel.destroy({where: {id: id}}).then(function(deletedVerificationCode) {
            return res.status(200).json({
                msg: "Verification code has been deleted"
            })
        })
    } catch (err) {
        return res.status(500).json({
            err: err,
            msg: "Server can not delete verification code"
        })
    }
}
