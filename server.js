require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');
const views = require('./views');

const app = express();
const PORT = process.env.PORT || 5000;

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'public')));

app.use(function (req, res, next) {
  if (!/https/.test(req.protocol)) {
    console.log(req.headers.host + req.url);
    res.redirect("https://" + req.headers.host + req.url);
  } else {
    return next();
  }
});

app.get('/', (req, res) => {
  console.log('tamo aqui')
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  // res.send(views.landing({ message: '' }));
});




app.listen(PORT, () => console.log(`Server listening on ${PORT}`));