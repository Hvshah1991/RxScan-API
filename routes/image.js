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

            // Imports the Google Cloud client library
            const vision = require('@google-cloud/vision');

            async function setEndpoint() {
            // Specifies the location of the api endpoint
            const clientOptions = {apiEndpoint: 'us-vision.googleapis.com'};

            // Creates a client
            const client = new vision.ImageAnnotatorClient(clientOptions);

            // Performs text detection on the image file
            const [result] = await client.textDetection(imagePath);
            const labels = result.textAnnotations;
            console.log('Text:');
            labels.forEach(label => console.log(label.description));
            }
            
            setEndpoint();

        }
      });
});

router.post('/', async (req, res) => {
    try {
        const label = await setEndpoint();
        res.send(label);
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;