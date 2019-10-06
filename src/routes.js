const express = require('express');
const router = express.Router();
const cors = require('cors');

router.all('*', cors());

router.get('/', (request, response) => {
    response.json({
        info: 'Welcome to the API'
    });
});

module.exports = router;