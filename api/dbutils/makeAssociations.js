import {
    userModel,
    verificationCodeModel,
    forumRoleModel,
    postModel,
    topicModel,
    postRefTopicModel,
    commentModel
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

    //user -< forumRole
    //   1 to many
    userModel.hasMany(forumRoleModel, {
        onDelete: "CASCADE",
        foreignKey: {
            name: "userId"
        }
    })
    forumRoleModel.belongsTo(userModel)

    //user -< post
    //   1 to many
    userModel.hasMany(postModel, {
        onDelete: "SET NULL",
        foreignKey: {
            name: "userId"
        }
    })
    postModel.belongsTo(userModel)

    //user -< comment
    //   1 to many
    userModel.hasMany(commentModel, {
        onDelete: "SET NULL",
        foreignKey: {
            name: "userId"
        }
    })
    commentModel.belongsTo(userModel)
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
    //========================================POST
    //post -< comment
    //   1 to many
    postModel.hasMany(commentModel, {
        onDelete: "CASCADE",
        foreignKey: {
            name: "postId"
        }
    })
    commentModel.belongsTo(postModel)
    //========================================COMMENT
    //comment -< comment
    //      1 to many
    commentModel.hasMany(commentModel, {
        onDelete: "CASCADE",
        foreignKey: {
            name: "commentId"
        }
    })
}
