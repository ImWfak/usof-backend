import {DataTypes} from "sequelize"

export const undefPostRefTopicModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    postId: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    topicId: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    creationDate: {
        type: DataTypes.BIGINT,
        defaultValue: () => Date.now()
    }
}
