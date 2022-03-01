const router = require('express').Router();
const { Review} = require('../../models');
const withAuth = require('../../utils/auth');

// '/api/review/:id' - Create review for specific game
router.post('/:id', withAuth, async (req, res) => {
  try {
    const newReview = await Review.create({
      ...req.body,
      user_id: req.session.user_id,
      game_id: req.params.id,
    });

    res.status(200).json(newReview);
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
