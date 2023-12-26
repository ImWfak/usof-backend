import {DataTypes} from "sequelize"

export const undefVerificationCodeModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        notNull: true
    },
    code: {
        type: DataTypes.INTEGER,
        unique: true,
        notNull: true
    },
    creationDate: {
        type: DataTypes.BIGINT,
        defaultValue: () => Date.now()
    }
}