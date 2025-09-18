const router = require('express').Router();
const MatchController = require('../controllers/matchController');
const auth = require('../middleware/auth');

router.post('/like/:targetId', auth, MatchController.likeUser);
router.get('/', auth, MatchController.getMatches);

module.exports = router;