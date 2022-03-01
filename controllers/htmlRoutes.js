const router = require('express').Router();
// const { render } = require('express/lib/response');
const sequelize = require('../config/connection');
const { User, Game, UserGames, Review, Wishlist } = require('../models');
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

// '/profile' - Where the user sees their profile information and games in their collection
// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [
        { model: Game, through: UserGames },
        {
          model: Wishlist,
          include: {
            model: Game,
          },
        },
        {
          model: Review,
          include: {
            model: Game,
          },
        },
      ],
    });

    const user = userData.get({ plain: true });
    console.log(user);
    res.render('profile', {
      user,
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

// '/games' - Where the user sees all games in the library
router.get('/games', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const gameData = await Game.findAll({
      include: [{ model: Review }],
      attributes: {
        include: [
          [
            // Use plain SQL to add up the total mileage
            sequelize.literal(
              '(SELECT COUNT(*) FROM review WHERE review.game_id = game.id)'
            ),
            'totalReviews',
          ],
          [
            // Use plain SQL to add up the total mileage
            sequelize.literal(
              '(SELECT CAST(AVG(review.rating) AS DECIMAL(10,1)) FROM review WHERE review.game_id = game.id)'
            ),
            'averageReview',
          ],
        ],
      },
    });

    const games = gameData.map((game) => game.get({ plain: true }));

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
      include: [
        {
          model: Review,
          include: [
            {
              model: User,
            },
          ],
        },
        { model: User, through: UserGames },
      ],
      attributes: {
        include: [
          [
            sequelize.literal(
              `(SELECT COUNT(*) FROM review WHERE review.game_id = ${req.params.id})`
            ),
            'totalReviews',
          ],
          [
            sequelize.literal(
              `(SELECT CAST(AVG(review.rating) AS DECIMAL(10,1)) FROM review WHERE review.game_id = ${req.params.id})`
            ),
            'averageReview',
          ],
        ],
      },
    });

    const games = gameData.get({ plain: true });
    console.log(games);

    const parsePlatforms = (data) => {
      const array = [];
      for (review of data.reviews) {
        array.push(review.platform);
      }
      return (uniq = [...new Set(array)]);
    };

    const platforms = parsePlatforms(games);

    res.render('single-game', {
      games,
      platforms,
      logged_in: true,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/about-us', async (req, res) => {
  res.render('about-us');
});

module.exports = router;
