const app = require('express');
const router = app.Router();
const user = require('./user');
router.use('/v1', user);

module.exports = router;