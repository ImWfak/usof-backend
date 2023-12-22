import {DataTypes} from "sequelize"

export const undefUser = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        notNull: true
    },
    login: {
        type: DataTypes.STRING,
        unique: true,
        notNull: true
    },
    password: {
        type: DataTypes.STRING,
        notNull: true
    },
    verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    pfpUrl: {
        type: DataTypes.STRING,
        defaultValue: "./pfp/"
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
