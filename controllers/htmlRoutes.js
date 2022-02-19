const router = require('express').Router();
const { User, Game, UserGame, Review } = require('../models');
const withAuth = require('../utils/auth');

// // TODO: Need to validate this route works
// // '/' - Home page - basic info about the app
// router.get('/', async (req, res) => {
//   try {
//     // Pass serialized data and session flag into template
//     res.render('homepage', {
//       logged_in: req.session.logged_in,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // TODO: Need to validate this route works
// // '/profile' - Where the user sees their profile information and games in their collection
// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Game, through: UserGame }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // TODO: Need to validate this route works
// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login');
// });

// // TODO: Need to validate this route works
// // '/register' - Where the user creates an account
// // register.handlebars
// router.get('/signup', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('signup');
// });

// // TODO: Need to validate this route works
// // '/games' - Where the user sees all games in the library
// router.get('/games', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const gameData = await Game.findAll({
//       include: [{ model: Review }],
//     });

//     const games = gameData.map((game) => game.get({ plain: true }));

//     res.render('games', {
//       ...games,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // TODO: Need to validate this route works
// // '/games/:id' - Where the user can see a specific game
// router.get('/games/:id', withAuth, (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const gameData = await Game.findByPk(req.params.id, {
//       include: [{ model: Review }, { model: User, through: UserGame }],
//     });

//     const game = gameData.get({ plain: true });

//     res.render('single-game', {
//       ...game,
//       logged_in: true,
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
