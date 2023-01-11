const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY, FROM_EMAIL } = require("../../config");

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  try {
    const email = { ...data, from: FROM_EMAIL };
    await sgMail.send(email);
    return true;
  } catch (error) {
	  console.log(error);
	  throw error;
  }
};

module.exports = sendEmail;
