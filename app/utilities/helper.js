const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class Helper {
  hashing = (password, callback) => {
    bcrypt.hash(password, 10, function (err, hash) {
      if (err) {
        return callback(err, null);
      } else {
        return callback(null, hash);
      }
    });
  };

  token = (data) => {
    const dataForToken = {
      id: data._id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
    };
    return jwt.sign({ dataForToken }, process.env.JWT_SECRET, {
      expiresIn: "24H",
    });
  };

  validateToken = (req, res, next) => {
    const header = req.headers.authorization;
    const myArr = header.split(" ");
    const token = myArr[1];
    try {
      if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
          if (error) {
            return res
              .status(400)
              .send({ success: false, message: "Invalid Token" });
          } else {
            req.user = decoded;
            next();
          }
        });
      } else {
        return res.status(401).send({
          success: false,
          message: "Authorisation failed! Invalid user",
        });
      }
    } catch (error) {
      return res
        .status(500)
        .send({ success: false, message: "Something went wrong!" });
    }
  };

  jwtTokenGenerateforConfirm = (payload, secretkey, callback) => {
    jwt.sign(
      { email: payload.email },
      secretkey,
      { expiresIn: "500h" },
      (err, token) => {
        if (err) {
          return callback("token not generated", null);
        } else {
          return callback(null, token);
        }
      }
    );
  };

  sendWelcomeMail = (data) => {
    try {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL, // generated ethereal user
          pass: process.env.PASSWORD, // generated ethereal password
        },
      });

      // send mail with defined transport object
      let info = transporter.sendMail({
        from: '"Fundoo Notes" <no-reply@fundoonotes.com>', // sender address
        to: data.email, // list of receivers
        subject: "Welcome - Fundoo notes account", // Subject line
        text: `Hello ${data.firstName}.`, // plain text body
        html: `<b>Hello ${data.firstName} Welcome - Fundoo notes. your account Has been created successfully</b>`, // html body
      });
      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    } catch {}
  };
}
module.exports = new Helper();
