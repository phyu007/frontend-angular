const express = require('express');
const path = require('path');
const app = express();


// default Heroku PORT
app.listen(process.env.PORT || 3000);