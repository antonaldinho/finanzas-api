const express = require('express');
const router = express.Router();
const cors = require('cors');

const auth = require('./middleware/auth');
const users = require('./controllers/users');
const accounts = require('./controllers/accounts');

router.all('*', cors());

router.get('/', (req, res) => {
    res.json({
        info: 'Welcome to the finanzas API'
    });
});

router.get('/users', auth, users.getUser);
router.post('/users', users.createUser);
router.post('/users/login', users.login);
router.post('/users/logout', auth, users.logout);

router.get('/accounts', auth, accounts.getAccounts);
router.get('/accounts/:id', auth, accounts.getAccount);
router.post('/accounts', auth, accounts.createAccount);
router.patch('/accounts/:id', auth, accounts.updateAccount);
router.delete('/accounts/:id', auth, accounts.deleteAccount);


module.exports = router;