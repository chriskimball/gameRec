const router = require('express').Router();
const { UserGames, Wishlist } = require('../../models');
const withAuth = require('../../utils/auth');

// '/api/games/:id' - Adds game to user's profile/collection
router.post('/:id', withAuth, async (req, res) => {
  try {
    const userGamesData = await UserGames.create({
      game_id: req.params.id,
      user_id: req.session.user_id,
    });

    res.status(200).json(userGamesData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// '/api/games/wishlist/:id' - Adds game to user's wishlistnpm 
router.post('/wishlist/:id', withAuth, async (req, res) => {
  try {
    const wishlistData = await Wishlist.create({
      game_id: req.params.id,
      user_id: req.session.user_id,
    });

    res.status(200).json(wishlistData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// '/api/games/wishlist/:id' - Deletes game to user's wishlist
router.delete('/wishlist/:id', withAuth, async (req, res) => {

  try {
    const wishlistData = await Wishlist.destroy({
      where: {
        game_id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!wishlistData) {
      res.status(404).json({ message: 'This game is not on your wishlist!' });
      return;
    }

    res.status(200).json(wishlistData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
