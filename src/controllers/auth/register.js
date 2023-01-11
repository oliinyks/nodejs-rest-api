const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
const { sendEmail } = require("../../helpers");
const { nanoid } = require("nanoid");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    throw new Conflict(`${email} is already in use`);
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarURL = gravatar.url(email);

  const verificationToken = nanoid();
  const result = await User.create({
    email,
    password: hashPassword,
    avatarURL,
    subscription,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Please Verify Your Email",
    html: `<p>Let's verify your email so you can start working with website.</p>
	 <a href = "http://localhost:3000/api/users/verify/${verificationToken}" target="_blank">Verify email</a>`,
  };
	await sendEmail(mail)
	
  res.json({
    status: "success",
    code: 201,
    data: {
      user: {
        email,
        avatarURL,
        subscription,
      },
    },
  });
  return result;
};

module.exports = register;
