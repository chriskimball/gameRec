const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Game extends Model {}

Game.init(
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true,
        },
        game_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        game_summary: {
            type: DataTypes.STRING,
        },
        release_date: {
            type: DataTypes.DATE,
        }
    },
    {
        sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'game'
    }
)

module.exports = Game;