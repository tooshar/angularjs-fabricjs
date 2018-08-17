const fetch = require('node-fetch');

module.exports = {

    async imageHandler(image, filename) {
        try {
            if (!image || !filename)
                return false;

            var base64Data = image.replace(/^data:image\/png;base64,/, "");

            require("fs").writeFile("public/images/" + filename + '.jpg', base64Data, 'base64', function (err) {
                console.log(err);
            });
            return "../images/" + filename + '.jpg';

        } catch (err) {
            console.log('Error', err);
            return false;
        }
    },

    genRandomFileName() {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      
        for (var i = 0; i < 7; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));
      
        return text;
      }


}