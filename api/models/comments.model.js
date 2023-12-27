import {DataTypes} from "sequelize"
import {commentForEnum} from "../enums/commentType.enum.js"

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
    commentFor: {
        type: DataTypes.ENUM(...Object.values(commentForEnum)),
        notNull: true,
        validate: {
            customValidator(commentFor) {
                if (!Object.values(commentForEnum).includes(commentFor))
                    throw new Error("Wrong comment type value")
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
