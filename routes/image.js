const fs = require('fs');
const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const { ImageAnnotatorClient } = require('@google-cloud/vision');
const axios = require('axios');

// setting maximum payload size limit
router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));



// POST requests
router.post('/', async (req, res) => {
    const image = req.body.image;
    const imageName = `frame_${Date.now()}.jpg`;
    const imagePath = `/Users/harshshah/Downloads/rxscan-api/images/${imageName}`;
    const imageBuffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');

    fs.writeFile(imagePath, imageBuffer, async (err) => {
        if (err) {
            console.error('Error saving image:', err);
            res.status(500).send('Error saving image');
        } else {
            console.log('Image saved:', imageName);

            // Creates a client
            const client = new ImageAnnotatorClient();

            try {
                // Performs text detection on the image file
                const [result] = await client.textDetection(imagePath);
                const labels = result.textAnnotations;
                console.log('Text:');
                labels.forEach(label => console.log(label.description));

                // Make a request to the RxTerms API for each detected label
                const rxTermsResults = await Promise.all(
                    labels.map(async (label) => {
                    const rxTermsResponse = await axios.get('https://clinicaltables.nlm.nih.gov/api/rxterms/v3/search', {
                        params: {
                        terms: label.description, // The search string (e.g., just a part of a word) for which to find matches in the list
                        maxList: 1, //the number of results want to request
                        ef: 'DISPLAY_NAME,STRENGTHS_AND_FORMS,RXCUIS', // A comma-separated list of additional fields to be returned for each retrieved list item
                        },
                    });

                    return rxTermsResponse.data;
                    })
                );


                // Sending both labels and RxTerms API response as a single response
                res.send({
                    labels,
                    rxTermsResults,
                });
                } catch (error) {
                    console.error('Error during text detection:', error);
                    res.status(500).send('Error during text detection');
                }
        }
    });
});

module.exports = router;