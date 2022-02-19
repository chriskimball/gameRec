const sequelize = require('../config/connection');
const { User, Review, Game, UserGames } = require('../models');

const userData = require('./userData.json');
const gameData = require('./gameData.json');
const reviewData = require('./reviewData.json');
const userGameData = require('./userGameData.json');

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  const games = await Game.bulkCreate(gameData);
  const reviews = await Review.bulkCreate(reviewData);
  const userGames = await UserGames.bulkCreate(userGameData);

  process.exit(0);
};

seedDatabase();
