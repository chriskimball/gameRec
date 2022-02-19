const User = require('./User');
const Game = require('./Game');
const Review = require('./Review');
const userGames = require('./userGames');

Game.belongsToMany(User, {through: userGames, foreignKey: 'game_id' });

User.belongsToMany(Game, {through: userGames, foreignKey: 'user_id'});

module.exports = { User, Game, Review, userGames };
