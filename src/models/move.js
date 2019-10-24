const mongoose = require('mongoose');

const supportedTypes = ['income', 'expense', 'transfer'];
const moveSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
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
        ref: 'Origin'
    },
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        required: false,
        ref: 'Destination'
    }
})

const Move = mongoose.model('Move', moveSchema);

module.exports = Move;