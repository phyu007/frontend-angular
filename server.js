const express = require('express');
const path = require('path');
const app = express();

// Serve static files....
app.use(express.static("app"));

// Send all requests to index.html
app.get('/*', function (req, res) {
    res.redirect('/overall');
});

// default Heroku PORT
app.listen(process.env.PORT || 3000);