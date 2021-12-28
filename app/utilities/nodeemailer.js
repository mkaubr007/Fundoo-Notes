const nodemailer = require("nodemailer");
require("dotenv").config();
const Otp = require("../models/otp.js");

exports.sendEmail = (mailMessage) => {
  let otpcode = Math.random().toString(36).substring(2, 12);
  let optData = new Otp({
    email: mailMessage.email,
    code: otpcode,
    expireIn: new Date().getTime() + 300 * 1000,
  });
  optData.save();
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.PASSWORD,
    },
  });

  const message = {
    from: process.env.EMAIL,
    to: mailMessage.email,
    subject: "Fundoo notes otp code",
    html: `Enter this otp to reset your password
    <h3>${otpcode}</h3>`,
  };

  transporter.sendMail(message, (err, info) => {
    if (err) {
      console.log(err);
    } else {
      console.log("email has been sent", info.response);
      return info.response;
    }
  });
};
  exports.sendConfirmMail = (token, data) => {
    console.log("nodemail",token +"+"+data.email)
    const link = `http://localhost:${process.env.PORT}/confirmregister/${token}`;
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      service: "gmail",
      secure: false,
      auth: {
        user: process.env.EMAIL, // generated ethereal user
        pass: process.env.PASSWORD, // generated ethereal password
      },
      tls: {
        rejectUnauthorized: false
    }
    });

    // send mail with defined transport object
    let info = transporter.sendMail({
      from: '"Fundoo Notes" <no-reply@fundoonotes.com>', // sender address
      to: data.email, // list of receivers
      subject: "Verify Mail - Fundoo notes account", // Subject line
      text: `Hello ${data.firstName}.`, // plain text body
      html: `<b>Hello ${data.firstName}. Here is your link to Verify Mail: <button href="${link}"> <a href="${link}">confirm mail</a></button></b>`, // html body
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  }

