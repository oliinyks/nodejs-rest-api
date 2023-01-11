const sgMail = require("@sendgrid/mail");
const { SENDGRID_API_KEY } = require("../../config");

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async(data) => {
  try {
    const email = { ...data, from: "oliinyk.holla@gmail.com" };
    await sgMail.send(email);
    return true;
  } catch (error) {
   //  throw error;
  }
};

module.exports = sendEmail;
