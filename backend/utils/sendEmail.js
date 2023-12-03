const nodeMailer = require("nodemailer");

const sendEmail = async (options) => {
    const transpoter = nodemailer.createTransport({
        host: process.env.HOST,
        port: 465,
        service: process.env.SMPT_SERVICE,
        auth: {
            user: process.env.SMPT_MAIL,
            pass: process.env.SMPT_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.SMPT_MAIL,
        to: options.email,
        subject: options.sunject,
        text: options.message,
    };
    await transpoter.sendEmail(mailOptions);
};
module.exports = sendEmail;