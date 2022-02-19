const User = require('./User');
const Game = require('./Game');
const Review = require('./Review');
const UserGames = require('./userGames');

Game.belongsToMany(User, {through: UserGames, foreignKey: 'game_id' });

User.belongsToMany(Game, {through: UserGames, foreignKey: 'user_id'});

User.hasMany(Review, {foreignKey: 'user_id', onDelete: 'CASCADE'});

Review.belongsTo(User, {foreignKey: 'user_id'});

Game.hasMany(Review, {foreignKey: 'game_id', onDelete: 'CASCADE'});

Review.belongsTo(Game, {foreignKey: 'game_id'});

module.exports = { User, Game, Review, UserGames };
