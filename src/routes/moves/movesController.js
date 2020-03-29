const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const moves = require('./movesHelper');

router.route('/')
    .get(auth, moves.getUserMoves)
    .post(auth, moves.createMove);

router.route('/:id')
    .delete(auth, moves.deleteMove)
    .patch(auth, moves.updateMove);

router.get('/account/:id', auth, moves.getAccountMoves);
router.get('/daily-balance', auth, moves.getDailybalance);

module.exports = router;