const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class userGames extends Model {}

userGames.init(
    {
        userGameId: {
            type: DataTypes.INTERGER,
            primaryKey: true
        }
    },
    {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'userGames',
    }
)
module.exports = userGames;