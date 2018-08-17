
const mysql = require('mysql');

// connection configurations
const mc = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'dummy'
});

// connect to database

mc.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }

    let createUser = `create table if not exists user(
                            id int primary key auto_increment,
                            image varchar(255) not null
                        )`;

    mc.query(createUser, function (err, results, fields) {
        if (err) {
            console.log(err.message);
        }
    });

});

module.exports = mc;