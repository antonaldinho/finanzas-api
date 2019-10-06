const express = require('express');
const router = express.Router();
const cors = require('cors');

router.all('*', cors());

router.get('/', (req, res) => {
    res.json({
        info: 'Welcome to the finanzas API'
    });
});

module.exports = router;