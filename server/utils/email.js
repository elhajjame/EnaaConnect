import nodemailer from "nodemailer";

export const sendEmail = async (options) => {
  // 1) create a transporter

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
    // ACTIVE THE LESS SECURE APP OPTION
  });

  // 2) define the email option
  const mailOptions = {
    from: "ENAA Connect <el-hajjame@outlook.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
    // html:
  };
  // 3) actually send the mail
  await transporter.sendMail(mailOptions);
};
