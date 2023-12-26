import {
    userModel,
    postModel, verificationCodeModel
} from "./defineModels.js"

export async function makeAssociations() {
    //user -- verificationCode
    //   1 to 1
    userModel.hasOne(verificationCodeModel, {
        onDelete: "CASCADE",
        foreignKey: {
            name: "userId"
        }
    })
    verificationCodeModel.belongsTo(userModel)

    //user -< post
    //   1 to many
    userModel.hasMany(postModel, {
        onDelete: "SET NULL",
        foreignKey: {
            name: "userId"
        }})
    postModel.belongsTo(userModel)
}
