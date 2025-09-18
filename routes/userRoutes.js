const router = require('express').Router();
const UserController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/me', auth, UserController.getMe);
router.put('/me', auth, UserController.updateProfile);
router.get('/browse', auth, UserController.browseProfiles);

module.exports = router;