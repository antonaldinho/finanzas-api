const express = require('express');
const router = express.Router();
const app = express();
const cors = require('cors');

const users = require('./routes/users/usersController');
const accounts = require('./routes/accounts/accountsController');
const moves = require('./routes/moves/movesController');

router.all('*', cors());

router.get('/', (req, res) => {
    res.json({
        info: 'Welcome to the finanzas API'
    });
});

app.use('/users', users);
app.use('/accounts', accounts);
app.use('/moves', moves);
module.exports = router;