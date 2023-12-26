import {
    userModel,
    verificationCodeModel,
    postModel,
    topicModel,
    postRefTopicModel
} from "./defineModels.js"

export async function makeAssociations() {
    //========================================USER
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
    //========================================POST REF TOPIC
    //post -< postRefTopic >- topic
    //   1 to     many     to 1
    postModel.belongsToMany(topicModel, {
        through: postRefTopicModel,
        foreignKey: "postId"
    })
    topicModel.belongsToMany(postModel, {
        through: postRefTopicModel,
        foreignKey: "topicId"
    })
}
