const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth');

router.get('/', authMiddleware.auth,  userController.read);
router.get('/:id', authMiddleware.auth, userController.readById);
router.post('/signin', userController.signin);

// router.post('/', (req, res) => {
//     res.send('create user ')
// })

// router.patch('/:id', (req, res) => {
//     res.send(`update user ID ${req.params.id}`)
// })

// router.delete('/:id', (req, res) => {
//     res.send(`delete user ID ${req.params.id}`)
// })

module.exports = router;