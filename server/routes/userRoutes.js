const UserController = require('../controllers/UserController');
const Router = require('express').Router;
const router = new Router();
const {body} = require('express-validator');
const authMiddleware = require('../middlewares/auth-middleware');
const upload = require('../middlewares/upload-avatar');

router.post('/registration',
    upload.single('avatar'),
    body('email').isEmail(), 
    body('password').isLength({min: 3, max: 32}), 
    UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleware, UserController.getUsers);
router.get('/user/:userId', authMiddleware, UserController.getUser);
router.get('/search', authMiddleware, UserController.searchUsers);
router.put('/user/update', authMiddleware, upload.single('avatar'),  UserController.updateUser);

module.exports = router;