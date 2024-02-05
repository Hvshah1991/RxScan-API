# RxScan

## Back-End Overview

Using Express - we are communicating with Google Cloud Vision to send base64 Images and recieve response.

### Description

RxScan – helps the user to check doctor prescriptions. It’s converts handwritten
prescriptions to legible text and runs a medicine search to find details and other
alternative for the drug. Basically, it cross-checks from medical database (National
Library of Medicine) if the prescribed medicine is recognised. This will promote safe
drug (medicine) use. Additionally, it also provides the user ability to keep reminders for
the medicine usage.

# Getting Started

## Dependencies
* @google-cloud/vision
* axios
* cors
* bodyParser
* dotenv
* express
* nodemon

## Steps
* Set-Up Google Cloud Vision: https://cloud.google.com/vision/docs

* Install the Vision API client library

* Install nodemon and in your terminal: npx nodemon index.js - this will start the server

* Also, don't forget to set the .env file per your convenience. Choose the port of your preference.

* The back-end server should be running for it to communicate with Google's Vision API.


## Help

Any advise or help regarding issues, you can contact: harshvshah.22@gmail.com

## Authors

Contributors names and contact info:
* Harsh Shah [@_AIARXR](https://twitter.com/_AIARXR)

## License

This project is licensed under the MIT License.

## Version History! :tada:

* 0.1
    * Initial Release

