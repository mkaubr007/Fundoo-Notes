const nodemailer = require('nodemailer');
require('dotenv').config();
const Otp=require('../models/otp.js');

exports.sendEmail = (mailMessage) => {
  let otpcode=Math.random().toString(36).substring(2,12);
  let optData=new Otp({
    email:mailMessage.email,
    code:otpcode,
    expireIn:new Date().getTime()+300*1000
  })
  optData.save();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const message = {
    from: process.env.EMAIL,
    to: mailMessage.email,
    subject:'Fundoo notes otp code',
    html:`Enter this otp to reset your password
    <h3>${otpcode}</h3>`
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log('email has been sent', info.response);
      return info.response;
    }
  });
};