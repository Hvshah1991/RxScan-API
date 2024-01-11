// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

async function setEndpoint() {
  // Specifies the location of the api endpoint
  const clientOptions = {apiEndpoint: 'us-vision.googleapis.com'};

  // Creates a client
  const client = new vision.ImageAnnotatorClient(clientOptions);

  // Performs text detection on the image file
  const [result] = await client.textDetection('./images/frame_1704838961610.jpg');
  const labels = result.textAnnotations;
  console.log('Text:');
  labels.forEach(label => console.log(label.description));
}
setEndpoint();

