const router = require('express').Router();
const { User, Game, UserGames, Review } = require('../models');
const withAuth = require('../utils/auth');

// '/' - Home page - basic info about the app
router.get('/', async (req, res) => {
  try {
    // Pass serialized data and session flag into template
    res.render('homepage', {
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO: Need to validate this route works
// '/profile' - Where the user sees their profile information and games in their collection
// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  //   try {
  //     // Get all projects and JOIN with user data
  //     const userData = await User.findAll({
  //       where: {
  //         id: req.session.user_id,
  //       },
  //       attributes: { exclude: ['password'] },
  //       include: [{ model: Game, through: UserGames }],
  //     });

  //     // Serialize data so the template can read it
  //     const user = userData.get({ plain: true });
  //     // Pass serialized data and session flag into template
  //     res.render('profile', {
  //       ...user,
  //       logged_in: req.session.logged_in,
  //     });
  //   } catch (err) {
  //     res.status(500).json(err);
  //   }

  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Game, through: UserGames }],
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render('profile', {
      ...user,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

// '/register' - Where the user creates an account
// register.handlebars
router.get('/signup', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

// TODO: Need to validate this route works
// '/games' - Where the user sees all games in the library
router.get('/games', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const gameData = await Game.findAll({
      include: [{ model: Review }],
    });

    const games = gameData.map((game) => game.get({ plain: true }));
    console.log(games);
    res.render('games', {
      games,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// TODO: Need to validate this route works
// '/games/:id' - Where the user can see a specific game
router.get('/games/:id', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const gameData = await Game.findByPk(req.params.id, {
      include: [{ model: Review }, { model: User, through: UserGame }],
    });

    const game = gameData.get({ plain: true });

    res.render('single-game', {
      ...game,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
