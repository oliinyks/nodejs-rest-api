const { User } = require("../../models/user");
const { NotFound, BadRequest } = require("http-errors");
const { verifyEmailLetter } = require("../../helpers");

const resendVerifyEmail = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    throw new NotFound("User not found");
  }
  if (user.verify) {
    throw new BadRequest("Verification has already been passed");
  }
  await verifyEmailLetter(email, user.verificationToken);

  res.json({
    message: "Verification email sent",
    status: "success",
    code: 200,
  });
};

module.exports = resendVerifyEmail;
