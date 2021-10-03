const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');

class EmailController {

    sendEmail(req, res) {
        const smtpConfig = {
            host: 'smtp.gmail.com',
            port: 465,
            secure: true, // use SSL
            auth: {
                user: '', // Your email id
                pass: '' // Your password
            }
        }
        const { mail,message } = req.body

        const transporter = nodemailer.createTransport(smtpConfig);

        const mailOptions = {
            from: 'tyrrhenian1212@gmail.com', // sender
            to: mail, // list of receivers
            subject: 'Happybaby',
            text: 'this is some text',
            html: `<h1>${message}</h1>`
        }

        const isOk = transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return false;
            } else {
                console.log('Message sent: ' + info.response);
                return true;
            };
        });
        if(isOk){
            return res.status(400).json({message: 'Message no sended'})
        }
        return res.status(200).json({message: 'Ok'})
    }

}


module.exports = new EmailController()
