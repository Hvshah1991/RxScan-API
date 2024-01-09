require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const imageRoutes = require("./routes/image")

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Started on http://localhost:${PORT}`);
    console.log("Press CTRL + C to stop server...");
});

app.use(cors({ origin: CORS_ORIGIN }));

app.use(express.json());

app.use('/image-captured', imageRoutes);

app.get('/', (req, res) => {
    res.send('Welcome to RxScan API');
});


module.exports = app;