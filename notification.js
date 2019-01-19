const nodemailer = require('nodemailer');
var exports = module.exports= {};

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: '****@gmail.com',
      pass: '****'
    }
  });

exports.notify = function (email) {
    console.log("DING DONG!");
    let mailOptions = {
        from: '***@gmail.com',
        to: email,
        subject: '你的pizza已经做好了',
        text: 'Ho ho ho ho ho ho ho ho' 
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(email);
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
} 
