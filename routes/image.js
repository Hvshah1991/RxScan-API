const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const multer = require('multer');

// Body-Parser
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());


const imageCapPath = '/Users/harshshah/Downloads/rxscanimage';

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, imageCapPath)
    },
    filename: function(req, file, cb) {
        cb(null, `${file.fieldname}_dateVal_${Date.now()}_${file.originalname}`)
    }
})


const imageCap = multer({storage: storage})

// POST requests
router.post('/image-captured', imageCap.array("image-file"), (req, res) => {
    console.log('POST request received to /image-captured.')
    // Adding req.body to test
    console.log('Axios POST body: ', req.body);

    res.send('POST request received on server to /image-captured.')
})


module.exports = router;