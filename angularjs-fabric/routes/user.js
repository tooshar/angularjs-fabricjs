const express = require('express');
const router = express.Router();

const handler = require('../controllers/user');

router.get('/image', handler.getAllImages);
router.post('/image', handler.saveImage);

module.exports = router;