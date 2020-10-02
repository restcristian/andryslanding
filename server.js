const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const transporter = nodemailer.createTransport({
  host: 'mail.gandi.net',
  auth: {
    user: 'hi@andrysfrias.com',
    pass: 'magestad.,7',
  },
  secure: true,
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
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
    if (error) {
      return res.sendStatus(500);
    }
    return res.sendFile(path.join(__dirname, 'index.html'));
  });
});

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
