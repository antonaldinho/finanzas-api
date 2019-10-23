const Account = require('../models/account');

const getAccounts = function (req, res) {
    // gets the logged user accounts only
    Account.find({ ownedBy: req.user._id })
        .then(accounts => {
            res.send(accounts);
        })
        .catch(error => {
            res.status(500).send(error);
        });
}

const getAccount = function (req, res) {
    const _id = req.params.id;
    Account.findOne({ _id, ownedBy: req.user._id })
        .then(account => {
            if (!account) {
                return res.status(404).send({ error: `Account with id ${_id} not found.` });
            }
            return res.send(account);
        })
        .catch(error => {
            res.status(500).send(error);
        });
}

const createAccount = function (req, res) {
    console.log((!req.body.name || !req.body.balance || !req.body.type));
    if (!req.body.name || !req.body.balance || !req.body.type) {
        return res.status(400).send({ error: 'Missing parameters' });
    }
    let description = '';
    if (req.body.description) {
        description = req.body.description
    }
    const newAccount = new Account({
        name: req.body.name,
        balance: req.body.balance,
        type: req.body.type,
        description: description,
        ownedBy: req.user._id
    });

    newAccount.save()
        .then(() => {
            return res.send({
                msg: 'Account created correctly',
                account: newAccount
            });
        })
        .catch(error => {
            return res.status(400).send(error);
        });
}

const updateAccount = function (req, res) {
    const _id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'balance', 'type', 'description'];
    const isUpdateValid = updates.every(update => allowedUpdates.includes(update));
    if (!isUpdateValid) {
        return res.status(400).send({ error: 'Invalid updates' });
    }

    Account.findByIdAndUpdate(_id, req.body)
        .then(account => {
            if (!account) {
                return res.status(400).send({ error: 'Could not update account. Try again later' });
            }
            return res.send({success: 1, account: account});
        })
        .catch(error => {
            return res.status(400).send(error);
        });
}

const deleteAccount = function (req, res) {
    const _id = req.params.id;
    Account.findOneAndDelete({ _id, ownedBy: req.user._id })
        .then(account => {
            if (!account) {
                return res.status(400).send({ error: `Account with id ${_id} not found.` })
            }
            return res.send({
                sucess: 1,
                account: account
            });
        })
        .catch(error => {
            res.status(505).send({
                success: 0,
                error: error
            });
        });
}

module.exports = {
    getAccounts: getAccounts,
    getAccount: getAccount,
    createAccount: createAccount,
    updateAccount: updateAccount,
    deleteAccount: deleteAccount
}