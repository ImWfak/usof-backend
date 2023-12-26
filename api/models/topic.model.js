import {DataTypes} from "sequelize"

export const undefTopicModel = {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        notNull: true
    },
    description: {
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
