const { User } = require("../../models/user");
const { NotFound, BadRequest } = require("http-errors");
const { sendEmail } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("User not found");
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }
  const mail = {
    to: email,
    subject: "Please Verify Your Email",
    html: `<p>Let's verify your email so you can start working with website.</p>
	 <a href = "http://localhost:3000/api/users/verify/${user.verificationToken}" target="_blank">Verify email</a>`,
  };
  await sendEmail(mail);
  res.json({
    message: "Verification email sent",
    status: "success",
    code: 200,
  });
};

module.exports = resendVerifyEmail;
