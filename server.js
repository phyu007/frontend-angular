const express = require('express');
const path = require('path');
const ngApp = express();
ngApp.use(express.static('./dist/app/excess-inentory'));
ngApp.get('/*', function (request, response) {
    response.sendFile(path.join(__dirname, './dist/app/excess-inentory'));
});
ngApp.listen(process.env.PORT || 8080);