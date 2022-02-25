const router = require('express').Router();
const { UserGames } = require('../../models');
const withAuth = require('../../utils/auth');

// '/api/games/:id' - Adds game to user's profile/collection
router.post('/:id', withAuth, async (req, res) => {
  try {
    const userGamesData = await UserGames.create({
      game_id: req.params.id,
      user_id: req.session.user_id
    });

    res.status(200).json(userGamesData);

  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
