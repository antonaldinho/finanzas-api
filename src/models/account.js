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
            if(!supportedTypes.includes(value)){
                throw new Error ('Invalid type');
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
})

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;