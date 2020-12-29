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

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  // res.send(views.landing({ message: '' }));
});

app.post('/', (req, res) => {
  const {
    email,
    message
  } = req.body;

  const mailData = {
    to: 'hi@andrysfrias.com',
    from: 'andrysfrias@gmail.com',
    subject: `Message from the Landing Page <${email}>`,
    text: message,
    html: `<strong>${message}</strong>`,
  };
  let result = {};
  sgMail
    .send(mailData)
    .then((data) => {
      console.log('data', data);
      result = {
        message: 'Gracias por su mensaje.',
      };
      return res.send(views.landing(result));
    })
    .catch((error) => {
      console.log('error', error);
      if (error.response) {
        result = {
          message: 'Su mensaje no pudo ser enviado.',
        };
        return res.send(views.landing(result));
      }
    });
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));