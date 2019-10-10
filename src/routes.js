const express = require('express');
const router = express.Router();
const cors = require('cors');

const auth = require('./middleware/auth');
const users = require('./controllers/users');

router.all('*', cors());

router.get('/', (req, res) => {
    res.json({
        info: 'Welcome to the finanzas API'
    });
});

router.get('/users', auth, users.getUser);
router.post('/users', users.createUser);
router.post('/users/login', users.login);
router.post('/users/logout', users.logout);


module.exports = router;