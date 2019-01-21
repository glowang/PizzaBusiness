const nodemailer = require('nodemailer');
var exports = module.exports= {};

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'xxxxx@gmail.com',
      pass: 'xxxxxx'
    }
  });

exports.notify = function (email) {
    let mailOptions = {
        from: 'xxxxx@gmail.com',
        to: email,
        subject: 'Your Pizza is Ready for Pick-up!',
        text: 'Call us at xxx-xxx-xxxx for questions.' 
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
} 
