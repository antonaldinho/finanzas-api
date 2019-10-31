const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const supportedTypes = ['bank', 'cash', 'another'];

const accountSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true,
        validate(value) {
            if (!supportedTypes.includes(value)) {
                throw new Error('Invalid type');
            }
        }
    },
    description: {
        type: String
    },
    ownedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

accountSchema.virtual('moves', {
    ref: 'Move',
    localField: '_id',
    foreignField: 'origin'
});

accountSchema.statics.addIncome = (id, amount) => {
    let currentBalance;
    return new Promise((resolve, reject) => {
        Account.findById(id)
            .then(account => {
                currentBalance = account.balance;
                Account.findByIdAndUpdate(id, { balance: currentBalance + amount })
                    .then(account => {
                        resolve({
                            msg: 'Account updated properly',
                            account: account
                        });
                    }).catch(error => {
                        reject({
                            msg: 'Error at updating the account',
                            error: error
                        });
                    });
            }).catch(err => {
                reject({
                    msg: "Error at getting the current balance",
                    error: err
                });
            });
    })
}

accountSchema.statics.addExpense = (id, amount) => {
    let currentBalance;
    return new Promise((resolve, reject) => {
        Account.findById(id)
            .then(account => {
                currentBalance = account.balance;
                currentBalance - amount < 0 ? currentBalance = 0 : currentBalance = currentBalance - amount;
                Account.findByIdAndUpdate(id, { balance: currentBalance })
                    .then(account => {
                        resolve({
                            msg: 'Account updated properly',
                            account: account
                        });
                    }).catch(error => {
                        reject({
                            msg: 'Error at updating the account',
                            error: error
                        });
                    });
            }).catch(err => {
                reject({
                    msg: 'Error at finding the account',
                    error: err
                })
            });
    })
}

accountSchema.statics.processTransfer = (originID, destinationID, amount) => {
    let currentBalance;
    return new Promise((resolve, reject) => {
        Account.findById(originID)
            .then(originAccount => {
                Account.findById(destinationID)
                    .then(destinationAccount => {
                        currentBalance = originAccount.balance;
                        currentBalance - amount < 0 ? currentBalance = 0 : currentBalance = currentBalance - amount;
                        Account.findByIdAndUpdate(originID, { balance: currentBalance })
                            .then(() => {
                                Account.findByIdAndUpdate(destinationID, { balance: destinationAccount.balance + amount })
                                    .then(() => {
                                        resolve({ msg: 'Updated accounts' });
                                    }).catch(err => {
                                        reject(err);
                                    });
                            }).catch(err => {
                                reject(err);
                            });
                    }).catch(err => {
                        reject(err);
                    });
            }).catch(err => {
                reject(err);
            });
    });
}

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;