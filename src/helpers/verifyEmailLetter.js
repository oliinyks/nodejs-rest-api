const sendEmail = require("./sendEmail");

const verifyEmailLetter = async (email, verificationToken) => {
  const mail = {
    to: email,
    subject: "Please Verify Your Email",
    html: `<p>Let's verify your email so you can start working with website.</p>
	 <a href = "http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Verify email</a>`,
  };
  await sendEmail(mail);
};

module.exports = verifyEmailLetter;
