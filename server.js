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
  http.get('*', function (req, res) {
    console.log('https://' + req.headers.host + req.url);

    res.redirect('https://' + req.headers.host + req.url);

    // Or, if you don't want to automatically detect the domain name from the request header, you can hard code it:
    // res.redirect('https://example.com' + req.url);
  });
}

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'home.html'));
});


app.listen(PORT, () => console.log(`Server listening on ${PORT}`));