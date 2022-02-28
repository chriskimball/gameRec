const User = require('./User');
const Game = require('./Game');
const Review = require('./Review');
const UserGames = require('./userGames');
const Wishlist = require('./Wishlist');

Game.belongsToMany(User, {through: UserGames, foreignKey: 'game_id' });

User.belongsToMany(Game, {through: UserGames, foreignKey: 'user_id'});

User.hasMany(Review, {foreignKey: 'user_id', onDelete: 'CASCADE'});

Review.belongsTo(User, {foreignKey: 'user_id'});

Game.hasMany(Review, {foreignKey: 'game_id', onDelete: 'CASCADE'});

Review.belongsTo(Game, {foreignKey: 'game_id'});

Game.belongsToMany(User, {through: Wishlist, foreignKey: 'game_id'});

User.belongsToMany(Game, {through: Wishlist, foreignKey:'game_id'});

User.hasOne(Wishlist, {foreignKey: 'user_id'});

Wishlist.belongsTo(User, {foreignKey: 'user_id'});

module.exports = { User, Game, Review, UserGames, Wishlist };
