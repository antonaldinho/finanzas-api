const mongoose = require('mongoose');

const supportedTypes = ['income', 'expense', 'transfer'];
const supportedCategories = ['food/drinks', 'shopping', 'housing', 'transportation', 'vehicle', 'entertainment', 'communication/pc', 'financialExpenses', 'investments', 'income', 'others'];
const moveSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true,
        validate(value) {
            if (!supportedTypes.includes(value)) {
                throw new Error('Invalid move type');
            }
        }
    },
    amount: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true,
        validate(value) {
            if (!supportedCategories.includes(value)) {
                throw new Error('Invalid category');
            }
        }
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    comments: {
        type: String,
        required: false
    },
    origin: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Account'
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Account'
    },
    ownedBy: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

const Move = mongoose.model('Move', moveSchema);

module.exports = Move;