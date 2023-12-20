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
        default: false
    },
    pfpUrl: {
        type: DataTypes.STRING,
        default: "./pfp/"
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
        type: DataTypes.INTEGER,
        default: Date.now()
    },
    updateDate: {
        type: DataTypes.INTEGER,
        default: null
    }
}
