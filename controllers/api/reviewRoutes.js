const router = require('express').Router();
const { Review, User, Game } = require('../../models');
const withAuth = require('../../utils/auth');

// //'/api/review/:id' - Create review for specific game
// router.post('/:id', withAuth, async (req, res) => {
//     try {
//     //   const userData = await User.create(req.body);
  
//     //   req.session.save(() => {
//     //     req.session.user_id = userData.id;
//     //     req.session.logged_in = true;
  
//     //     res.status(200).json(userData);
//     //   });
//     } catch (err) {
//       res.status(400).json(err);
//     }
//   });
module.exports = router;
