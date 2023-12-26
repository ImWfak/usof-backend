import {
    userModel,
    postModel
} from "./defineModels.js"

export async function makeAssociations() {
    //user -< post
    //   1 to many
    userModel.hasMany(postModel, {
        onDelete: "SET NULL",
        foreignKey: {
            name: "userId"
        }})
    postModel.belongsTo(userModel)
}
