import {DataTypes} from "sequelize"
import {postStatusEnum} from "../enums/postStatus.enum.js"

export const undefPostModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    status: {
        type: DataTypes.ENUM(...Object.values(postStatusEnum)),
        defaultValue: postStatusEnum.ACTIVE,
        validate: {
            customValidator(postStatus) {
                if (!Object.values(postStatusEnum).includes(postStatus))
                    throw new Error("Wrong post status")
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        notNull: true
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
