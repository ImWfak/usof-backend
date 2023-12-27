import {DataTypes} from "sequelize"
import {forumRoleEnum} from "../enums/forumRoles.enum.js"

export const undefForumRoleModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    forumRole: {
        type: DataTypes.ENUM(...Object.values(forumRoleEnum)),
        defaultValue: forumRoleEnum.USER,
        validate: {
            customValidator(forumRole) {
                if (!Object.values(forumRoleEnum).includes(forumRole))
                    throw new Error("Wrong forum role value")
            }
        }
    },
    creationDate: {
        type: DataTypes.BIGINT,
        defaultValue: () => Date.now()
    }
}
