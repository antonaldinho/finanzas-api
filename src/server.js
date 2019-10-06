const express = require('express');
var cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

const router = require('./routes');

app.use(express.json());
app.use(router);
app.use(cors);

app.listen(port, function() {
    console.log(`Server up running on port ${port}`);
})