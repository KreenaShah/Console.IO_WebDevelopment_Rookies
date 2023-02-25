const nodemailer = require("nodemailer");
const handlebars = require("handlebars");
const fs = require("fs");
const path = require("path");

const sendemail = async (email, payload, template) => {
    try {

        let testAccount = await nodemailer.createTestAccount();
        console.log(testAccount);

        let transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: testAccount.smtp.port,
            secure: testAccount.smtp.secure,
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });
        console.log("Transporter created");
        const source = fs.readFileSync(path.join(__dirname, template), "utf8");
        const compiledTemplate = handlebars.compile(source);
        // send mail with defined transport object
        let info = await transporter.sendMail({
            from: 'foo@example.com', // sender address
            to: email, // list of receivers
            subject: "Password Reset Link", // Subject line
            html: compiledTemplate(payload), // html body
        });

        console.log("Message sent: %s", info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    }
    catch (err) {
        return err;
    }
}
module.exports = sendemail;