require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const views = require('./views');

const app = express();
const PORT = process.env.PORT || 5000;
const env = process.env.NODE_ENV || "development";

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

if (env !== "development") {

  // set up a route to redirect http to https
  app.use(function (req, res, next) {
    if (req.secure) {
      // request was via https, so do no special handling
      next();
    } else {
      // request was via http, so redirect to https
      res.redirect('https://' + req.headers.host + req.url);
    }
  });
}

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'home.html'));
});


app.listen(PORT, () => console.log(`Server listening on ${PORT}`));