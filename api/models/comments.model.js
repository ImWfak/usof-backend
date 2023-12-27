import {DataTypes} from "sequelize"
import {commentTypeEnum} from "../enums/commentType.enum.js"

export const undefCommentsModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        notNull: false
    },
    commentType: {
        type: DataTypes.ENUM(...Object.values(commentTypeEnum)),
        defaultValue: commentTypeEnum.COMMENT,
        validate: {
            customValidator(commentType) {
                if (!Object.values(commentTypeEnum).includes(commentType))
                    throw new Error("Wrong comment type")
            }
        }
    },
    postId: {
        type: DataTypes.INTEGER,
        notNull: false
    },
    commentId: {
        type: DataTypes.INTEGER,
        notNull: false
    },
    content: {
        type: DataTypes.STRING,
        notNull: true
    },
    creationDate: {
        type: DataTypes.BIGINT,
        defaultValue: () => Date.now()
    },
    updateDate: {
        type: DataTypes.BIGINT,
        defaultValue: null,
        validate: {
            customValidator(updateDate) {
                if (updateDate < this.creationDate)
                    throw new Error("Wrong updateDate value")
            }
        }
    }
}
