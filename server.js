require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const views = require('./views');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const { STMP_EMAIL, STMP_PASS, STMP_HOST } = process.env;

const transporter = nodemailer.createTransport({
  host: STMP_HOST,
  auth: {
    user: STMP_EMAIL,
    pass: STMP_PASS,
  },
  secure: true,
});

app.get('/', (req, res) => {
  res.send(views.landing({ message: '' }));
});

app.post('/', (req, res) => {
  const { email, message } = req.body;

  const mailData = {
    from: email,
    to: 'hi@andrysfrias.com',
    subject: 'Message from the Landing Page',
    text: message,
  };

  transporter.sendMail(mailData, (error, data) => {
    console.log('error', error);
    let result = {};
    if (error) {
      result = {
        message: 'Su mensaje no pudo ser enviado.',
      };
    }
    result = {
      message: 'Gracias por su mensaje.',
    };
    return res.send(views.landing(result));
  });
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
