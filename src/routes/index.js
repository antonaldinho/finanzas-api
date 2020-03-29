const express = require('express');
const router = express.Router();
const cors = require('cors');

router.all('*', cors());

router.route('/')
    .get((req, res) => {
        res.json({
            info: 'Welcome to the finanzas API 2'
        });
    })

module.exports = router;