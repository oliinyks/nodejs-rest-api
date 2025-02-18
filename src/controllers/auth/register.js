const { Conflict } = require("http-errors");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { User } = require("../../models/user");
const { verifyEmailLetter } = require("../../helpers");
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
  await verifyEmailLetter(email, verificationToken);

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
