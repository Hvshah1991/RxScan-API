require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const imageRoutes = require("./routes/image")

const PORT = process.env.PORT;
const { CORS_ORIGIN } = process.env;
app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`);
    console.log("Press CTRL + C to stop server...");
});

app.use(cors({ origin: CORS_ORIGIN }));

app.use('/image-captured', imageRoutes);

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Welcome to RxScan API');
});


module.exports = app;
