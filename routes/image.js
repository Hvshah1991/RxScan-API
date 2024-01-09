const fs = require('fs');
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

// setting maximum payload size limit
router.use(bodyParser.json({limit: '50mb'}));
router.use(bodyParser.urlencoded({limit: '50mb', extended: true}));



// POST requests
router.post('/', (req, res) => {
    const image = req.body.image;
    console.log(req.body.image);
    const imageName = `frame_${Date.now()}.jpg`;
    const imagePath = `/Users/harshshah/Downloads/rxscan-api/images/${imageName}`;
    const imageBuffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    fs.writeFile(imagePath, imageBuffer, (err) => {
        if (err) {
          console.error('Error saving image:', err);
          res.status(500).send('Error saving image');
        } else {
          console.log('Image saved:', imageName);
          res.sendStatus(200);
        }
      });
});


module.exports = router;