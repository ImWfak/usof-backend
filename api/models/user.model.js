import {DataTypes} from "sequelize"
import {
    userEmailRegex,
    userPhoneNumberRegex,
    userPasswordRegex,
    userPfpUrlRegex
} from "../regexes/user.regexex.js"

export const undefUserModel = {
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
                    throw new Error("Wrong email value")
            }
        }
    },
    phoneNumber: {
        type: DataTypes.STRING,
        unique: true,
        notNull: true,
        validate: {
            customValidator(phoneNumber) {
                if (!userPhoneNumberRegex.test(phoneNumber))
                    throw new Error("Wrong phoneNumber value")
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
                    throw new Error("Wrong password value")
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
                    throw new Error("Wrong pfpUrl value")
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
        defaultValue: function () {return Date.now()}
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
