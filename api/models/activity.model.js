import {DataTypes} from "sequelize"
import {activityForEnum} from "../enums/activityFor.enum.js"
import {activityTypeEnum} from "../enums/activityType.enum.js"

export const undefActivityModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        notNull: false
    },
    activityFor: {
        type: DataTypes.ENUM(...Object.values(activityForEnum)),
        notNull: true,
        validate: {
            customValidator(activityFor) {
                if (!Object.values(activityForEnum).includes(activityFor))
                    throw new Error("Wrong activity for value")
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
    activityType: {
        type: DataTypes.ENUM(...Object.values(activityTypeEnum)),
        notNull: true,
        validate: {
            customValidator(activityType) {
                if (!Object.values(activityTypeEnum).includes(activityType))
                    throw new Error("Wrong activity type value")
            }
        }
    },
    creationDate: {
        type: DataTypes.BIGINT,
        defaultValue: () => Date.now()
    },
    // updateDate: {
    //     type: DataTypes.BIGINT,
    //     defaultValue: null,
    //     validate: {
    //         customValidator(updateDate) {
    //             if (updateDate < this.creationDate)
    //                 throw new Error("Wrong updateDate value")
    //         }
    //     }
    // }
}
