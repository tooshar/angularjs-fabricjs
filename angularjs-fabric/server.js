const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const start = require('./routes');

app.use(bodyParser.json({
    limit: '50mb'
}));
app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: true
}));
app.use(express.static(path.join(__dirname, 'public')));

require('./db');
app.use('/api', start);

app.listen(8080, function () {
    console.log('App is running on port 8080');
});