const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');
const accounts = require('./accountsHelper');

router.route('/')
    .get(auth, accounts.getAccounts)
    .post(auth, accounts.createAccount);

router.route('/:id')
    .get(auth, accounts.getAccount)
    .patch(auth, accounts.updateAccount)
    .delete(auth, accounts.deleteAccount);

module.exports = router;