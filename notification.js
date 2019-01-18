const nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'wmytgf1021@gmail.com',
      pass: '******'
    }
  });

function notify(order) {
    let mailOptions = {
        from: 'wmytgf1021@gmail.com',
        to: order._email,
        subject: 'Your '+order._flavor+' pizza is ready for pick up',
        text: 'This is about to be the best pizza you ever had' 
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
} 
