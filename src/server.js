const express = require('express');
require('dotenv').config();
require('./db/mongoose');
var cors = require('cors');
const app = express();
const port = process.env.PORT || 3000;


const index = require('./routes/index');
const users = require('./routes/users/usersController');
const accounts = require('./routes/accounts/accountsController');
const moves = require('./routes/moves/movesController');

app.use(express.json());
app.use(cors());

app.use('/', index);
app.use('/users', users);
app.use('/accounts', accounts);
app.use('/moves', moves);

app.listen(port, function() {
    console.log(`Server up running on port ${port}`);
})