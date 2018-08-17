"use strict";
const _user = require('../handlers/user');
const mc = require('../db');
module.exports = {

    // get all images 
    async getAllImages (req, res) {
        mc.query('select * from user', function (error, results) {
            if (error) {
                res.status(400).send('Error in database operation');
            } else {
                res.send(results);
            }
        });
    },


    // Add a new image 
    async saveImage (req, res) {

        let image = req.body.image;
        let filename = _user.genRandomFileName();

        if (!image) {
            return res.status(400).send({
                error: true,
                message: 'Please provide image!'
            });
        }

        image = await _user.imageHandler(image, filename);


        mc.query("INSERT INTO user SET ? ", {
            image: image
        }, function (error, results) {
            if (error) throw error;
            return res.send({
                error: false,
                data: results,
                message: 'New image has been created successfully.'
            });
        });
    }

}