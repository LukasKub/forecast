const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

app.use(cors());

app.listen(port, () =>
    console.log("Listening on port " + port + "..."));

// Set up static file serving
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

// Node.js middleware for serving a favicon
var favicon = require('serve-favicon');
app.use(favicon(__dirname + '/favicon.ico'));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html",);
});

app.get("/forecast", function (req, res) {
    res.sendFile(__dirname + "/index.html",);
});

// Adds headers: Access-Control-Allow-Origin: *
app.get('/rss', cors(), function (req, res, next) {
    try {
        const RSS_URL = `https://www.in-pocasi.cz/rss.php`;

        function parseRSS(rssText) {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(rssText, 'application/xml');
            return xmlDoc;
        }

        fetch(RSS_URL)
            .then(response => response.text())
            .then(data =>
                res.json({ message: data }))

    } catch (error) {
        console.error('Error reading files:', error);
    }
});
