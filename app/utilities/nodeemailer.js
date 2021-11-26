const nodemailer = require('nodemailer');
require('dotenv').config();
const helper=require('../utilities/helper.js');
const { logger } = require('../../logger/logger');

exports.sendEmail = (data) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });

  const token = helper.token(data);
  
  const mailOption = {
    from: process.env.EMAIL,
    to: data.email,
    subject: 'Reset your password',
    text: 'This mail is just for testing',
    html: `
              <h2>please click on the link to change password</h2>
              <p>${process.env.CLIENT_URL}/resetpassword/${token}</p> 
                 `

  };

  transporter.sendMail(mailOption, (error, info) => {
    if (error) {
      logger.error(error);
    } else {
        console.log(info.response)
      return info.response;
    }
  });
};