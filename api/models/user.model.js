import {DataTypes} from "sequelize"
import {
    userEmailRegex, userPasswordRegex, userPfpUrlRegex
} from "../regexes/user.regex.js"

export const undefUser = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        notNull: true,
        validate: {
            customValidator(email) {
                if (!userEmailRegex.test(email))
                    throw new Error("Wrong user email")
            }
        }
    },
    login: {
        type: DataTypes.STRING,
        unique: true,
        notNull: true
    },
    password: {
        type: DataTypes.STRING,
        notNull: true,
        validate: {
            customValidator(password) {
                if (!userPasswordRegex.test(password))
                    throw new Error("Wrong user password")
            }
        }
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    pfpUrl: {
        type: DataTypes.STRING,
        defaultValue: "./pfp/",
        validate: {
            customValidator(pfpUrl) {
                if (!userPfpUrlRegex.test(pfpUrl))
                    throw new Error("Wrong user pfpUrl")
            }
        }
    },
    name: {
        type: DataTypes.STRING,
        notNull: true
    },
    surname: {
        type: DataTypes.STRING,
        notNull: true
    },
    creationDate: {
        type: DataTypes.BIGINT,
        defaultValue: () => Date.now()
    },
    updateDate: {
        type: DataTypes.BIGINT,
        defaultValue: null
    }
}
