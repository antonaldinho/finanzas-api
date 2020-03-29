const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const users = require('./usersHelper');

router.route('/')
    .get(auth, users.getUser)
    .post(users.createUser)
    .patch(auth, users.updateUser)
    .delete(auth, users.deleteUser);

router.route('/login').post(users.login);
router.post('/logout', auth, users.logout);

module.exports = router;