const Move = require('../models/move');
const Account = require('../models/account');

const createMove = function (req, res) {
    let move = {
        type: req.body.type,
        amount: req.body.amount,
        category: req.body.category,
        date: req.body.date,
        description: req.body.description,
        comments: req.body.comments,
        origin: req.body.origin,
        ownedBy: req.user._id
    };
    const amount = req.body.amount;
    const moveType = req.body.type;
    const accountId = req.body.origin;

    if (moveType === 'income') {
        Account.addIncome(accountId, amount)
            .then(msg => {
                const newMove = new Move(move);
                newMove.save()
                    .then(() => {
                        return res.send({
                            msg: 'Move saved properly and account updated',
                            move: move
                        });
                    }).catch(error => {
                        return res.status(400).send({
                            msg: 'Error at saving the move',
                            error: error
                        });
                    });
            }).catch(error => {
                return res.status(400).send(error);
            });
    } else if (moveType === 'expense') {
        Account.addExpense(accountId, amount)
            .then(msg => {
                const newMove = new Move(move);
                newMove.save()
                    .then(() => {
                        return res.send({
                            msg: 'Account updated properly and move saved',
                            move: move
                        });
                    }).catch(error => {
                        return res.status(400).send({
                            msg: 'Error at saving the move',
                            error: error
                        });
                    });
            }).catch(error => {
                return res.status(400).send(error);
            });
    } else {
        Account.processTransfer(accountId, req.body.destination, amount)
            .then(msg => {
                move.destination = req.body.destination;
                const newMove = new Move(move);
                newMove.save()
                    .then(() => {
                        return res.send({
                            msg: 'Accounts updated properly and transfer created'
                        });
                    }).catch(err => {
                        return res.status(400).send(err);
                    });
            }).catch(err => {
                return res.status(400).send(err);
            });
    }
}

// gets moves of specific account
const getAccountMoves = (req, res) => {
    const _id = req.params.id;
    Move.find({
            origin: _id
        })
        .then(moves => {
            return res.send(moves);
        }).catch(error => {
            return res.status(400).send(error);
        });
}

const getUserMoves = (req, res) => {
    Move.find({
            ownedBy: req.user._id
        })
        .then(moves => {
            return res.send(moves);
        }).catch(error => {
            return res.status(400).send(error);
        });
}

const deleteMove = (req, res) => {
    const _id = req.params.id;
    Move.findByIdAndDelete(_id)
        .then(move => {
            return res.send({
                msg: 'Move deleted properly',
                move: move
            });
        }).catch(err => {
            return res.status(400).send({
                msg: 'Error',
                error: err
            });
        });
}

const updateMove = function (req, res) {
    const _id = req.params.id;
    const updates = Object.keys(req.body)
    const allowedUpdates = ['type', 'amount', 'comments']
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidUpdate) {
        return res.status(400).send({
            error: 'Invalid update, only allowed to update: ' + allowedUpdates
        })
    }
    Move.findByIdAndUpdate(_id, req.body).then(function (move) {
        if (!move) {
            return res.status(404).send()
        }
        return res.send(move)
    }).catch(function (error) {
        res.status(500).send(error);
    })
}
module.exports = {
    createMove: createMove,
    getAccountMoves: getAccountMoves,
    getUserMoves: getUserMoves,
    deleteMove: deleteMove,
    updateMove: updateMove
}